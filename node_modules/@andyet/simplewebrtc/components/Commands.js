"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const Actions = tslib_1.__importStar(require("../actions"));
const Selectors_1 = require("../Selectors");
/**
 * @description
 *
 * @public
 */
class CustomCommands extends React.Component {
    constructor(props) {
        super(props);
        this.commandHandler = (event) => {
            if (!event.peer) {
                return;
            }
            if (event.scope === 'room' && this.props.onRoomCommand) {
                this.props.onRoomCommand(event);
            }
            if (event.scope === 'peer' && this.props.onPeerCommand) {
                this.props.onPeerCommand(event);
            }
        };
    }
    render() {
        const renderProps = {
            sendPeerCommand: this.props.sendPeerCommand,
            sendRoomCommand: this.props.sendRoomCommand
        };
        let render = this.props.render;
        if (!render && typeof this.props.children === 'function') {
            render = this.props.children;
        }
        return render ? render(renderProps) : this.props.children || null;
    }
    componentDidMount() {
        if (this.props.signalingClient) {
            this.props.signalingClient.xmpp.on('swrtc-command', this.commandHandler);
        }
    }
    componentDidUpdate(prev) {
        if (this.props.signalingClient !== prev.signalingClient) {
            this.props.signalingClient.xmpp.on('swrtc-command', this.commandHandler);
        }
    }
    componentWillUnmount() {
        if (this.props.signalingClient) {
            this.props.signalingClient.xmpp.off('swrtc-command', this.commandHandler);
        }
    }
}
function mapStateToProps(state, props) {
    return {
        signalingClient: Selectors_1.getClient(state)
    };
}
function mapDispatchToProps(dispatch, props) {
    return {
        sendPeerCommand: (peerAddress, datatype, data = {}) => dispatch(Actions.sendPeerCommand(peerAddress, datatype, data)),
        sendRoomCommand: (datatype, data = {}) => dispatch(Actions.sendRoomCommand(props.room, datatype, data))
    };
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CustomCommands);
