'use strict';

const _ = require('lodash');
const React = require('react');
const Index = require('./index');
const SortIndexesStore = require('../store/sort-indexes-store');

/**
 * Component for the index list.
 */
class IndexList extends React.Component {

  /**
   * Subscribe on mount.
   */
  componentWillMount() {
    this.unsubscribeSort = SortIndexesStore.listen(this.handleIndexChange.bind(this));
  }

  /**
   * Unsubscribe on unmount.
   */
  componentWillUnmount() {
    this.unsubscribeSort();
  }

  /**
   * The component constructor.
   *
   * @param {Object} props - The properties.
   */
  constructor(props) {
    super(props);
    this.state = { indexes: [] };
  }

  /**
   * Handles the sort indexes store triggering with indexes in a new order or the
   * initial load of indexes.
   *
   * @param {Array} indexes - The indexes.
   */
  handleIndexChange(indexes) {
    this.setState({ indexes: indexes });
  }

  /**
   * Render the index list.
   *
   * @returns {React.Component} The index list.
   */
  render() {
    var indexes = _.map(this.state.indexes, (model) => {
      return (<Index key={model.name} index={model} />);
    });
    return (
      <tbody className='table'>
        {indexes}
      </tbody>
    );
  }
}

IndexList.displayName = 'IndexList';

module.exports = IndexList;
