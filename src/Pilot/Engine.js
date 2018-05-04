import Action from './Action';

export default class Engine {
    evaluate() {
        return {
            type: Action.IDLE
        }
    }
}