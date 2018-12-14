
enum GuardState { 'BEGIN', 'AWAKE', 'SLEEP' }

interface Guard {
    id: number
    napTime: number
    sleepyMinutes: { [index: number]: number }
    sleepEvent?: GuardEvent
}

interface GuardEvent {
    id: number
    type: GuardState
    timestamp: number
}

const normalize = (events: string[]): any => {
    const guardEventRegEx = new RegExp('^\\[(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2})] (wakes up|falls asleep|guard (#\\d*) begins shift)', 'i');

    return events.map((event): GuardEvent | undefined => {
        const s = event.match(guardEventRegEx);
        if (!s || !s.length) return undefined;

        let type, id = 0;
        switch (s[2]) {
            case 'wakes up':
                type = GuardState.AWAKE;
                break;
            case 'falls asleep':
                type = GuardState.SLEEP;
                break;
            default:
                type = GuardState.BEGIN;
                id = parseInt(s[3].substr(1));
                break;
        }

        return {
            id,
            type,
            timestamp: new Date(s[1]).getTime()
        };
    })
    .filter((event) => event && event.hasOwnProperty('timestamp'))
    .sort((a, b) => a!.timestamp > b!.timestamp ? 1 : -1)
    .reduce((acc: GuardEvent[], event: GuardEvent | undefined) => {

        if (event) {

            const lastEvent = acc[acc.length - 1] || { id: 0 };
            const newEvent = { ...event };

            if (event!.id === 0 && lastEvent.id) {
                newEvent.id = lastEvent.id || 0;
            }

            return [...acc, newEvent];

        } else {

            return acc;

        }

    }, []);

};

const watchGuards = (events: GuardEvent[]): Guard[] => {

    return events.reduce((acc: Guard[], event: GuardEvent) => {

        let guard = acc.find((guard) => guard.id === event.id);
        if (!guard) {
            guard = {
                id: event.id,
                napTime: 0,
                sleepyMinutes: { ...Array.from(Array(61).fill(0)) }
            }
        }

        if (event.type === GuardState.SLEEP) {

            guard.sleepEvent = event;

        }

        if (event.type === GuardState.AWAKE && guard.sleepEvent) {

            guard.napTime = guard.napTime + (event.timestamp - guard.sleepEvent.timestamp);

            const startMin = new Date(guard.sleepEvent.timestamp).getMinutes();
            const endMin = new Date(event.timestamp).getMinutes();
            let minutes: number[] = [];
            for (let i = startMin; i < endMin; i++) minutes = [...minutes, i];
            guard.sleepyMinutes = minutes.reduce((acc, v) => {
                acc[v]++;
                return acc
            }, guard.sleepyMinutes);
        }

        return [...acc, guard];

    }, [])

};

const getSleepiestGuard = (guards: Guard[]): Guard => {

    return guards.reduce((acc, guard) => !acc || guard.napTime > acc.napTime ? guard : acc);

};

const getSleepiestMinutes = (guard: Guard): number => {

    const sorted = Object.entries(guard.sleepyMinutes)
        .sort((a, b) => a[1] > b[1] ? -1 : 1);

    return +sorted[0][0];

};

export default (input: string) => {

    const events = normalize(input.split('\n'));

    const guards = watchGuards(events);

    const sleepiestGuard = getSleepiestGuard(guards);

    const sleepiestMinute = getSleepiestMinutes(sleepiestGuard);

    const solution = sleepiestGuard.id * sleepiestMinute;

    return solution;

};
