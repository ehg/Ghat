var React = require( 'react' ),
    ConfigureFilter = require( './configure-filter' );

module.exports = React.createClass({
    displayName: 'ConfigureFilters',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        filters: React.PropTypes.arrayOf( React.PropTypes.shape({
            field: React.PropTypes.string,
            description: React.PropTypes.string,
            operators: React.PropTypes.arrayOf( React.PropTypes.string )
        }) ),
        onValueChanged: React.PropTypes.func,
        value: React.PropTypes.arrayOf( React.PropTypes.shape({
            field: React.PropTypes.string,
            operator: React.PropTypes.string,
            value: React.PropTypes.string
        }) )
    },

    getDefaultProps: function() {
        return {
            events: [],
            onValueChanged: function() {},
            value: []
        };
    },

    getRows: function() {
        return this.props.value.map(function( filter, i ) {
            return (
                <ConfigureFilter
                    key={ i }
                    filters={ this.props.filters }
                    value={ filter }
                    onValueChanged={ this.onFilterChanged.bind( this, i ) }
                    onRemove={ this.onFilterRemoved.bind( this, i ) } />
            );
        }, this );
    },

    addRow: function() {
        this.props.onValueChanged( this.props.name, this.props.value.concat([{}]) );
    },

    onFilterChanged: function( rowIndex, value ) {
        var newValue = this.props.value.slice( 0 );
        newValue.splice( rowIndex, 1, value );
        this.props.onValueChanged( this.props.name, newValue );
    },

    onFilterRemoved: function( rowIndex ) {
        var newValue = this.props.value.slice( 0 );
        newValue.splice( rowIndex, 1 );
        this.props.onValueChanged( this.props.name, newValue );
    },

    render: function() {
        return (
            <li className="configure-filters">
                <label className="form-option">
                    <p className="form-option__description">If you want to choose which events to relay, add one or more filters.</p>
                </label>
                <table className="configure-filters__current">
                    <thead className="visually-hidden">
                        <th>Field</th>
                        <th>Operator</th>
                        <th>Value</th>
                        <th>Delete</th>
                    </thead>
                    <tbody>{ this.getRows() }</tbody>
                </table>
                <button type="button" className="form-option__add button" onClick={ this.addRow }>
                    <span className="fa fa-plus" />
                    Add a filter
                </button>
            </li>
        );
    }
});
