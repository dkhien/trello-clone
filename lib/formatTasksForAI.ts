export const formatTasksForAI = (board:Board) => {
    const tasks = Array.from(board.columns.entries());
    const flatArray = tasks.reduce((map, [key, value]) => {
        map[key] = value.todos;
        return map;
    }, {} as {[key in TypedColumn]:Task[]});

    const flatArrayCounted = Object.entries(flatArray).reduce(
        (map, [key, value]) => {
            map[key as TypedColumn] = value.length;
            return map;
        },
        {} as {[key in TypedColumn]:number}
    )
    return flatArrayCounted;
}