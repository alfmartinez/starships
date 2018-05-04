import Engine from './Engine';
import Action from './Action';
import Component from './Component';

function getActions(program, world) {
    const engine = new Engine(program);
    const action = engine.evaluate(world);
    return action;
}

function expectIdleAction(program, world) {
    const actions = getActions(program, world);
    expect(actions.length).toBe(0);
}

function expectSingleAction(program, world, expectedAction) {
    const actions = getActions(program, world);
    expect(actions.length).toBe(1);
    const [action] = actions;
    expect(action).toEqual(expectedAction);
}

describe('Pilot Engine', () => {
    it('should provide null action if empty program', () => {
        const program = {};
        const world = {};
        expectIdleAction(program, world);
    });

    describe('Forward component', () => {
        it('should provide IDLE action if not connected to output', () => {
            const world = {};
            const program = {
                output: 'x2',
                components: [{
                    label: 'x1',
                    type: Component.FORWARD,
                    value: 1
                }]
            };
            expectIdleAction(program, world);
        });

        it('should provide THRUST action if connected to output', () => {
            const world = {};
            const program = {
                output: 'x1',
                components: [{
                    label: 'x1',
                    type: Component.FORWARD,
                    value: 1
                }]
            };
            const expectedAction = {
                type: Action.THRUST,
                value: 1
            };
            expectSingleAction(program, world, expectedAction);
        });

        it('should provide THRUST action if connected to output, power 2', () => {
            const world = {};
            const program = {
                output: 'x1',
                components: [{
                    label: 'x1',
                    type: Component.FORWARD,
                    value: 2
                }]
            };
            const expectedAction = {
                type: Action.THRUST,
                value: 2
            };
            expectSingleAction(program, world, expectedAction);
        });
    });

    describe('Turn component', ()=>{
        it('should return IDLE if not connected to output', () => {
            const world = {};
            const program = {
                output: 'x2',
                components: [{
                    label: 'x1',
                    type: Component.TURN,
                    value: 1
                }]
            };
            expectIdleAction(program, world);
        });

        it('should return TURN by fixed value if connected to output', () => {
            const world = {};
            const program = {
                output: 'x1',
                components: [{
                    label: 'x1',
                    type: Component.TURN,
                    value: 5
                }]
            };
            const expectedAction = {
                type: Action.TURN,
                value: 5
            };
            expectSingleAction(program, world, expectedAction);
        })
    });

})