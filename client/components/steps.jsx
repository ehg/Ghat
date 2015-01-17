var React = require( 'react' ),
    observe = require( '../mixins/observe-store' ),
    helpers = require( '../../shared/helpers/' ),
    stores = require( '../stores/' ),
    Connection = require( './connection' ),
    Configure = require( './configure' );

module.exports = React.createClass({
    displayName: 'Steps',

    mixins: [ observe( 'tokens', 'contacts', 'repositories' ) ],

    propTypes: {
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        avatars: React.PropTypes.instanceOf( stores.Avatar ).isRequired,
        contacts: React.PropTypes.instanceOf( stores.Contact ).isRequired,
        repositories: React.PropTypes.instanceOf( stores.Repository ).isRequired
    },

    render: function() {
        return (
            <ol className="steps">
                <Connection
                    name="github"
                    icon="github"
                    providers={ [ 'github' ] }
                    tokens={ this.props.tokens }
                    avatars={ this.props.avatars }
                    title="Connect to GitHub"
                    description="To create the webhooks necessary to relay events to your chat client, you must authorize Ghat to access your GitHub account." />
                <Connection
                    name="chat"
                    icon="comments"
                    providers={ helpers.integrations.getChatIntegrations() }
                    tokens={ this.props.tokens }
                    avatars={ this.props.avatars }
                    title="Connect to Chat"
                    description="To allow Ghat to send messages to your chat client, you must authorize access to your account." />
                <Configure
                    tokens={ this.props.tokens }
                    contacts={ this.props.contacts }
                    repositories={ this.props.repositories }
                    disabled={ ! this.props.tokens.isConnected() } />
            </ol>
        );
    }
});
