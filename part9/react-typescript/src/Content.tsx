interface ContentProps {
    name: string,
    count: number
}


const Content = (props : ContentProps) => {
    return (
        <div>
            <p>{props.name} {props.count}</p>
        </div>
    );
};

export default Content;