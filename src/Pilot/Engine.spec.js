import Engine from './Engine';
import Action from './Action';
import Component from './Component';

function getActions(program, world) {
    const engine = new Engine(program);
    const action = engine.evaluate(world);
    return action;
}

describe('Pilot Engine', () => {
    it('should provide null action if empty program', () => {
        const program = {};
        const world = {};
        const actions = getActions(program, world);
        expect(actions.length).toBe(0);
    });

    describe('forward component', () => {
        it('should provide IDLE action if not connected to output', () => {
            const program = {
                output: 'x2',
                components: [{
                    label: 'x1',
                    type: Component.FORWARD,
                    power: 1
                }]
            };
            const world = {};
            const actions = getActions(program, world);
            expect(actions.length).toBe(0);
        });

        it('should provide THRUST action if connected to output', () => {
            const program = {
                output: 'x1',
                components: [{
                    label: 'x1',
                    type: Component.FORWARD,
                    power: 1
                }]
            };
            const world = {};
            const actions = getActions(program, world);
            expect(actions.length).toBe(1);
            const [action] = actions;
            expect(action.type).toBe(Action.THRUST);
            expect(action.power).toBe(1);
        });

        it('should provide THRUST action if connected to output, power 2', () => {
            const program = {
                output: 'x1',
                components: [{
                    label: 'x1',
                    type: Component.FORWARD,
                    power: 2
                }]
            };
            const world = {};
            const actions = getActions(program, world);
            expect(actions.length).toBe(1);
            const [action] = actions;
            expect(action.type).toBe(Action.THRUST);
            expect(action.power).toBe(2);
        });


    })

})