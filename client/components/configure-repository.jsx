var React = require( 'react' ),
    Select = require( './select' );

module.exports = React.createClass({
    displayName: 'ConfigureRepository',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        repositories: React.PropTypes.arrayOf( React.PropTypes.shape({
            full_name: React.PropTypes.string,
            name: React.PropTypes.string
        }) ),
        value: React.PropTypes.string,
        onValueChanged: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            repositories: [],
            onValueChanged: function() {}
        };
    },

    getOptions: function() {
        return this.props.repositories.map(function( repository ) {
            return { value: repository.full_name, label: repository.name };
        });
    },

    render: function() {
        return (
            <li className="configure-repository">
                <label className="form-option">
                    <p className="form-option__description">Next, choose the GitHub repository to monitor.</p>
                    <span className="form-option__label">Choose a repository:</span>
                    <Select value={ this.props.value } onChange={ this.props.onValueChanged.bind( null, this.props.name ) } options={ this.getOptions() } />
                </label>
            </li>
        );
    }
});
