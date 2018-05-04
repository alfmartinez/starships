import Action from './Action';

export default class Engine {

    constructor({output,components}) {
        this.output = output;
        this.components = components;
    }

    evaluate() {
        const actions = [];

        if (this.output) {
            let component = this.components.find(item => item.label === this.output);
            if (component) {
                actions.push({
                    type: Action.THRUST,
                    power: component.power
                });
            }
        }

        return actions;
    }
}