import "./NeonCircle.css";

type NeonCircleProps = {
    color: string;
    shadow?: string;
};

function NeonCircle({ color, shadow }: NeonCircleProps) {
    return (
        <div className="neonCircleContainer">
            <div
                style={{
                    background: `${color}`,
                    boxShadow: `0 0 8px ${shadow ?? color}`,
                }}
                className="neonCircle"
            ></div>
        </div>
    );
}

export default NeonCircle;
