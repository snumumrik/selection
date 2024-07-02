import {Trigger} from "../types";

/**
 * Determines whether a MouseEvent should execute until completion depending on
 * which button and modifier(s) are active for the MouseEvent.
 * The Event will execute to completion if ANY of the triggers "matches"
 * @param event MouseEvent that should be checked
 * @param triggers A list of Triggers that signify that the event should execute until completion
 * @returns Whether the MouseEvent should execute until completion
 */
export function shouldTrigger(event: MouseEvent, triggers: Trigger[]): boolean {
    for (const trigger of triggers) {
        // The trigger requires only a specific button to be pressed
        if (typeof trigger === "number" && event.button === trigger) {
            return true;
        }

        // The trigger requires a specific button to be pressed AND some modifiers
        if (typeof trigger === "object") {
            const reqButtonIsPressed = trigger.button === event.button;

            const allReqModifiersArePressed = trigger.modifiers.every((modifier) => {
                switch (modifier) {
                    case "alt":
                        return event.altKey;
                    case "ctrl":
                        return event.ctrlKey || event.metaKey;
                    case "shift":
                        return event.shiftKey;
                }
            });

            if (reqButtonIsPressed && allReqModifiersArePressed) {
                return true;
            }
        }
    }

    // By default, we do not process the event
    return false;
}