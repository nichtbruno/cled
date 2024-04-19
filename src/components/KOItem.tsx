import useDragger from "../hooks/useDragger";

interface KOItemProps {
    klasse: Klasse;
    selected: boolean,
    onSelect: (id: number) => void,
}

function KOItem({ klasse, selected, onSelect }: KOItemProps) {

    const bgstyle = {
        background: klasse.bgcolor,
        color: klasse.fgcolor,
    }

    const selectedStyle = {
        border: selected ? "3px dashed lightgreen" : "none",
    }

    useDragger(klasse.id.toString());

    return (
        <div className="diggas" id={klasse.id.toString()} style={selectedStyle} onClick={() => onSelect(klasse.id)}>
            <div className="app-container" style={bgstyle}>
                <div className="app-header">{klasse.name ? klasse.name : "Name"}</div>
                <div className="property-container">
                    {klasse.attributes.length !== 0 ? klasse.attributes.map(attribute =>
                        <div className="property-row" key={attribute.id}>
                            <div className="property-name">{attribute.name}</div>
                        </div>
                    ) :
                        <div className="property-row">
                            <div className="property-name">example: type</div>
                        </div>
                    }
                </div>
                <div className="method-container">
                    <div className="method-row">
                        {klasse.methodes.length !== 0 ? klasse.methodes.map(methode =>
                            <div className="method-name" key={methode.id}>{methode.name}</div>
                        ) :
                            <div className="method-name">method</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KOItem;

