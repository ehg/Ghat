var intersection = require( 'lodash/array/intersection' ),
    LocalStore = require( './local' ),
    helpers = require( '../../shared/helpers/' ),
    integrations = require( '../../shared/integrations/' ),
    TokenStore;

/**
 * The store constructor, which invokes the inherited store's constructor.
 */
TokenStore = module.exports = function() {
    LocalStore.call( this, 'tokens' );
    this.verified = {};
    this.isVerifying = {};
};

TokenStore.prototype = Object.create( LocalStore.prototype );

/**
 * Retrieves a token by the specified provider. If the token hasn't yet been
 * verified, an undefined value is returned and the token is verified to be
 * valid. Once verification is complete, a `verify` event is emitted. If the
 * token is invalid, it is removed from the store.
 *
 * @param  {mixed}  provider The provider for the token to be retrieved
 * @return {string}          A verified token, or undefined if verification
 *                           is pending
 */
TokenStore.prototype.get = function( provider ) {
    var token = LocalStore.prototype.get.call( this, provider );

    if ( this.verified[ provider ] ) {
        return token;
    } else if ( token && ! this.isVerifying[ provider ] && provider in integrations ) {
        this.isVerifying[ provider ] = true;

        integrations[ provider ].verify( token, function( err ) {
            if ( err ) {
                this.remove( provider );
            } else {
                this.verified[ provider ] = true;
                this.emit( 'change' );
                this.emit( 'verify' );
            }

            this.isVerifying[ provider ] = false;
        }.bind( this ) );
    }
};

/**
 * Returns true if the store contains a valid token for GitHub, or false
 * otherwise.
 *
 * @return {Boolean} True if the store contains a valid GitHub token
 */
TokenStore.prototype.isConnectedToGitHub = function() {
    return !! this.get( 'github' );
};

/**
 * Returns true if the store contains a valid token for any chat provider, or
 * false otherwise.
 *
 * @return {Boolean} True if the store contains a valid chat provider token
 */
TokenStore.prototype.isConnectedToChat = function() {
    return !! this.getConnectedChatToken();
};

/**
 * Returns true if the store contains a valid token for both GitHub and any
 * chat provider, or false otherwise.
 *
 * @return {Boolean} True if the store contains a valid GitHub and chat
 *                   provider token
 */
TokenStore.prototype.isConnected = function() {
    return this.isConnectedToGitHub() && this.isConnectedToChat();
};

/**
 * Returns the first available token for any chat provider.
 *
 * @return {string} The first available token for any chat provider
 */
TokenStore.prototype.getConnectedChatToken = function() {
    var connections = this.getAll(),
        chatTokens;

    if ( connections ) {
        chatTokens = intersection(
            Object.keys( connections ),
            helpers.integrations.getChatIntegrations()
        );

        if ( chatTokens.length ) {
            return chatTokens[0];
        }
    }
};
