import React, { PureComponent } from 'react';
import ListTemplate from '@/components/ListLayout/ListTemplate'

export default class Template extends PureComponent {

    constructor(props) {
        super();
        const { match: { params: { bCode } } } = props;
        this.state = {
            bCode
        };
    }

    componentWillReceiveProps(nextProp) {
        const { match: { params } } = nextProp;
        const { bCode } = this.state;
        if (bCode !== params.bCode) {
            this.setState({
                bCode: params.bCode,
            });
        }
    }

    handleBtnClick =(value)=>{
        console.info(value);
    }

    render() {
        const { bCode } = this.state;
        return (
          <ListTemplate btnClick={this.handleBtnClick} bCode={bCode} />
        )
    }
}