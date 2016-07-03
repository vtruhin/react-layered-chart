import * as _ from 'lodash';
import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setPhysicalChartWidthAndLoad } from '../flux/compoundActions';

interface DispatchProps {
  setPhysicalChartWidthAndLoad: typeof setPhysicalChartWidthAndLoad;
}

@PureRender
class ConnectedResizeSentinelLayer extends React.Component<DispatchProps, void> {
  private __setSizeInterval: number;
  private __lastWidth: number;

  render() {
    return (
      <div className='resize-sentinel' ref='element'/>
    );
  }

  componentDidMount() {
    this._maybeCallOnSizeChange();
    this.__setSizeInterval = setInterval(this._maybeCallOnSizeChange, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.__setSizeInterval);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.actions !== nextProps.actions && _.isNumber(this.__lastWidth)) {
      this.props.setPhysicalChartWidthAndLoad(this.__lastWidth);
    }
  }

  private _maybeCallOnSizeChange = () => {
    const newWidth = (this.refs['element'] as HTMLElement).offsetWidth;
    if (this.__lastWidth !== newWidth) {
      this.__lastWidth = newWidth;
      this.props.setPhysicalChartWidthAndLoad(this.__lastWidth);
    }
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return bindActionCreators({ setPhysicalChartWidthAndLoad }, dispatch);
}

export default connect(null, mapDispatchToProps)(ConnectedResizeSentinelLayer) as any as React.ComponentClass<void>;
