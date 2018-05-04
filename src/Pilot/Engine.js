import Action from './Action';
import Component from './Component';

const ComponentAction = {
    [Component.FORWARD]: Action.THRUST,
    [Component.TURN]: Action.TURN
};

export default class Engine {

    constructor({output,components}) {
        this.output = output;
        this.components = components;
    }

    evaluate(world) {
        const actions = [];

        if (this.output) {
            let component = this.components.find(item => item.label === this.output);
            if (component) {
                actions.push(this.evaluateAction(component));
            }
        }

        return actions;
    }

    evaluateAction({value,type}) {
        let actionType = ComponentAction[type];
        return {
            type: actionType,
            value
        };
    }
}