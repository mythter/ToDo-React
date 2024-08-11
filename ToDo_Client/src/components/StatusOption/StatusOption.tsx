import statusColorMapping from "../../helpers/mappings/statusColorMapping";
import Status from "../../models/status";
import NeonCircle from "../NeonCircle/NeonCircle";
import "./StatusOption.css";

interface StatusOptionProps {
    status: Status;
}

function StatusOption({ status }: StatusOptionProps) {
    return (
        <div className="statusOption">
            <NeonCircle
                color={statusColorMapping[status.id - 1].color}
                shadow={statusColorMapping[status.id - 1].shadow}
            />
            <div className="statusTitle">{status.name}</div>
        </div>
    );
}

export default StatusOption;
