import React from 'react';
import PureRender from 'pure-render-decorator';

import LineLayer from './LineLayer';
import SelectFromStore from './SelectFromStore';

@PureRender
@SelectFromStore
class Stack extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
    seriesIds: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  };

  static selectFromStore = {
    xAxis: 'xAxis',
    yAxis: 'yAxis',
    seriesMetadataById: 'seriesMetadataById',
    seriesDataById: 'seriesDataById'
  };

  render() {
    return (
      <div className='stack'>
        {this.props.seriesIds.map(this._chooseLayerType.bind(this))}
        {this.props.children}
      </div>
    );
  }

  _chooseLayerType(seriesId) {
    const metadata = this.state.seriesMetadataById[seriesId];
    const layerProps = {
      seriesId,
      metadata,
      xDomain: this.state.xAxis,
      yDomain: this.state.yAxis,
      data: this.state.seriesDataById[seriesId],
      key: seriesId
    };

    switch((metadata || {}).chartType) {
      case 'line':
        return <LineLayer {...layerProps}/>;

      default:
        return null;
    }
  }
}

export default Stack;
