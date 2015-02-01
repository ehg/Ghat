var EventEmitter = require( 'events' ).EventEmitter,
    integrations = require( '../../shared/integrations/' ),
    RepositoryStore;

/**
 * The store constructor, which invokes the inherited store's constructor.
 */
RepositoryStore = module.exports = function() {
    this.fetching = false;
};

RepositoryStore.prototype = Object.create( EventEmitter.prototype );

/**
 * Returns the available repositories associated with the specified token. If
 * the repositories have not yet been fetched, a network request will be
 * invoked and an empty array returned.
 *
 * @param  {string} token A valid GitHub OAuth2 token
 * @return {Array}        An array of available repositories
 */
RepositoryStore.prototype.get = function( token ) {
    if ( ! this.repositories || this.token !== token ) {
        this.repositories = [];
        this.token = token;
        this.fetch( token );
    }

    return this.repositories;
};

/**
 * Given an OAuth token, invokes a network request to GitHub to request the
 * available repositories for the user associated with the token. When the
 * request is complete, the repositories are saved to the store and a `change`
 * event is emitted.
 *
 * @param {string} token A valid GitHub OAuth2 token
 */
RepositoryStore.prototype.fetch = function( token ) {
    if ( ! token ) {
        return;
    }

    this.fetching = true;

    integrations.github.getRepositories( token, function( err, repositories ) {
        if ( ! err ) {
            this.repositories = repositories;
            this.emit( 'change' );
        }

        this.fetching = false;
    }.bind( this ) );
};
