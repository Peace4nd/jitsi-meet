// @flow

import React from 'react';

import './index.css';
import { copyText } from '../../features/base/util';

type Props = {
    label: string,
    labelSuccess: string,
    content: string
}

type State = {
    clicked: boolean,
    position: number
}

/**
 * Kopirovaci tlacitko.
 */
export default class CopyButton extends React.Component<Props, State> {
    /**
     * Konstruktor.
     *
     * @param {Props} props - Vlastnosti.
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            clicked: false,
            position: 0
        };

        this.buttonRef = React.createRef();
        this.tooltipRef = React.createRef();

        this._onClick = this._onClick.bind(this);
    }

    buttonRef: *;
    tooltipRef: *;

    /**
     * Pripojeni komponenty.
     *
     * @returns {void}
     */
    componentDidMount() {

        const button = this.buttonRef.current.getBoundingClientRect();
        const tooltip = this.tooltipRef.current.getBoundingClientRect();


        console.log(button);
        console.log(tooltip);

        this.setState({
            position: (tooltip.width - button.width) / 2
        });
    }

    /**
     * Render.
     *
     * @returns {React$Element<any>}
     */
    render() {
        // rozlozeni
        const { label, labelSuccess } = this.props;
        const { clicked, position } = this.state;

        // sestaveni
        return (
            <div
                className = 'toolbox-button'
                onClick = { this._onClick }
                ref = { this.buttonRef }>
                <div className = { `copy_link${clicked ? ' success' : ''}` }>
                    <span className = 'label'>{label}</span>
                    <svg
                        className = 'check'
                        height = '16'
                        viewBox = '0 0 16 16'
                        width = '16'
                        xmlns = 'http://www.w3.org/2000/svg'>
                        <path
                            d = 'M12 0L5 7 2 4 0 6 5 11 14 2z'
                            fill = '#FFF'
                            transform = 'translate(1 3)' />
                    </svg>
                    <div
                        className = 'tooltip'
                        ref = { this.tooltipRef }
                        style = {{ left: -position }}>{labelSuccess}</div>
                </div>
            </div>
        );
    }


    _onClick: () => void;

    /**
     * Handler kliknuti.
     *
     * @private
     * @returns {void}
     */
    _onClick() {
        this.setState({
            clicked: true
        }, () => {
            copyText(this.props.content);
            setTimeout(() => {
                this.setState({
                    clicked: false
                });
            }, 2000);
        });
    }
}
