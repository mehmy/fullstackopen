interface TotalProps {
    total: number
}
const Total = (props:TotalProps) => {
    return (
        <div>
            <p>Number of exercises {props.total}</p>
        </div>
    );
};

export default Total;