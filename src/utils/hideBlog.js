
export default function hideBlog(a, b) {
    // A comparer used to determine if two entries are equal.
    const isSameUser = (a, b) => a._id === b
    // Get items that only occur in the left array,
    // using the compareFunction to determine equality.
    const onlyInLeft = (left, right, compareFunction) =>
        left.filter(leftValue =>
            !right.some(rightValue =>
                compareFunction(leftValue, rightValue)));
    const onlyInA = onlyInLeft(a, b, isSameUser);
    const onlyInB = onlyInLeft(b, a, isSameUser);
    let result = [...onlyInA];
    return result;
}

