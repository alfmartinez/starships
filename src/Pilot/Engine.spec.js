import Engine from './Engine';
import Action from './Action';

describe('Pilot Engine', () => {
    it('should provide null action if empty program', () => {
        const program = {};
        const world = {};
        const engine = new Engine(program);
        const action = engine.evaluate(world);
        expect(action.type).toBe(Action.IDLE);
    })
})