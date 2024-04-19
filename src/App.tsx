import { useState } from "react";
import KOItem from "./components/KOItem";
import { HexColorPicker } from "react-colorful";

function App() {

    const [klassen, setKlassen] = useState<Klasse[]>([]);
    const [selectedKlasse, setSelectedKlasse] = useState<number>(0);
    const [projectSettings, setProjectSettings] = useState<boolean>(true);

    const handleSwitchSettings = () => {
        setProjectSettings(true);
        setSelectedKlasse(0);
    }

    // Handle Class
    const handleAddClass = () => {
        const newId = Date.now();
        setKlassen([...klassen, { id: newId, name: "", attributes: [], methodes: [], bgcolor: "#5DADE2", fgcolor: "#000000" }]);
        handleSelectKlass(newId);
        setProjectSettings(false);
    }

    const handleSelectKlass = (id: number) => {
        setSelectedKlasse(id);
        setProjectSettings(false);
    }

    // Handle Attributes
    const handleAddAttributes = (klasseId: number) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return { id: klasse.id, name: klasse.name, attributes: [...klasse.attributes, { id: Date.now(), name: "" }], methodes: klasse.methodes, bgcolor: klasse.bgcolor, fgcolor: klasse.fgcolor };
            }
            return klasse;
        }));
    }

    const handleAttributesChange = (klasseId: number, id: number, attName: string) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return {
                    id: klasse.id, name: klasse.name, attributes: klasse.attributes.map(attribute => {
                        if (attribute.id === id) { return { id: attribute.id, name: attName } }
                        return attribute;
                    }), methodes: klasse.methodes, bgcolor: klasse.bgcolor, fgcolor: klasse.fgcolor
                };
            }
            return klasse;
        }));
    }

    const handleAttributeDelete = (klasseId: number, id: number) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return { id: klasse.id, name: klasse.name, attributes: klasse.attributes.filter(attribute => attribute.id !== id), methodes: klasse.methodes, bgcolor: klasse.bgcolor, fgcolor: klasse.fgcolor };
            }
            return klasse;
        }));
    }

    // Handle Methodes
    const handleAddMethodes = (klasseId: number) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return { id: klasse.id, name: klasse.name, attributes: klasse.attributes, methodes: [...klasse.methodes, { id: Date.now(), name: "" }], bgcolor: klasse.bgcolor, fgcolor: klasse.fgcolor };
            }
            return klasse;
        }));
    }

    const handleMethodesChange = (klasseId: number, id: number, methName: string) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return {
                    id: klasse.id, name: klasse.name, attributes: klasse.attributes, methodes: klasse.methodes.map(method => {
                        if (method.id === id) { return { id: method.id, name: methName } }
                        return method;
                    }), bgcolor: klasse.bgcolor, fgcolor: klasse.fgcolor
                };
            }
            return klasse;
        }));
    }

    const handleMethodDelete = (klasseId: number, id: number) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return { id: klasse.id, name: klasse.name, attributes: klasse.attributes, methodes: klasse.methodes.filter(method => method.id !== id), bgcolor: klasse.bgcolor, fgcolor: klasse.fgcolor };
            }
            return klasse;
        }));
    }

    // Handle Name
    const handleNameChange = (klasseId: number, newName: string) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return { id: klasse.id, name: newName, attributes: klasse.attributes, methodes: klasse.methodes, bgcolor: klasse.bgcolor, fgcolor: klasse.fgcolor }
            }
            return klasse;
        }))
    }

    // Handle Color
    const handleBgColorChange = (klasseId: number, newColor: string) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return { id: klasse.id, name: klasse.name, attributes: klasse.attributes, methodes: klasse.methodes, bgcolor: newColor, fgcolor: klasse.fgcolor }
            }
            return klasse;
        }))
    }

    const handleFgColorChange = (klasseId: number, newColor: string) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return { id: klasse.id, name: klasse.name, attributes: klasse.attributes, methodes: klasse.methodes, bgcolor: klasse.bgcolor, fgcolor: newColor }
            }
            return klasse;
        }))
    }

    return (
        <main>
            <div className="panel">
                <button className="active-btn accent-btn" onClick={() => handleSwitchSettings()}>Project Settings</button>
                {!projectSettings ? <>
                    <button className="active-btn" onClick={() => handleAddClass()}>Add Class</button>
                    <input className="spec-input" placeholder="Name" value={klassen.find(klasse => klasse.id === selectedKlasse)?.name} onChange={e => handleNameChange(selectedKlasse, e.target.value)} />
                    <div className="input-list">
                        {klassen.find(klasse => klasse.id === selectedKlasse)?.attributes.map(attribute =>
                            <div key={attribute.id}>
                                <input placeholder="example :/= type" value={attribute.name} onChange={e => handleAttributesChange(selectedKlasse, attribute.id, e.target.value)} />
                                <button className="deleteButton" onClick={() => handleAttributeDelete(selectedKlasse, attribute.id)}>X</button>
                            </div>
                        )
                        }
                        <button onClick={() => handleAddAttributes(selectedKlasse)}>+ Add Attribute</button>
                    </div>
                    <div className="input-list">
                        {klassen.find(klasse => klasse.id === selectedKlasse)?.methodes.map(methode =>
                            <div key={methode.id}>
                                <input placeholder="method" value={methode.name} onChange={e => handleMethodesChange(selectedKlasse, methode.id, e.target.value)} />
                                <button className="deleteButton" onClick={() => handleMethodDelete(selectedKlasse, methode.id)}>X</button>
                            </div>
                        )}
                    </div>
                    <button onClick={() => handleAddMethodes(selectedKlasse)}>+ Add Method</button>
                    <section className="small">
                        <HexColorPicker color={klassen.find(klasse => klasse.id === selectedKlasse)?.bgcolor} onChange={(e) => handleBgColorChange(selectedKlasse, e)} />
                    </section>
                    <section className="small">
                        <HexColorPicker color={klassen.find(klasse => klasse.id === selectedKlasse)?.fgcolor} onChange={(e) => handleFgColorChange(selectedKlasse, e)} />
                    </section>
                </> :
                    <>
                        <button className="active-btn" onClick={() => handleAddClass()}>Add Class</button>
                    </>
                }
            </div>
            <div className="free-container polka-pattern">
                {klassen.map(klasse => <KOItem klasse={klasse} selected={selectedKlasse == klasse.id ? true : false} onSelect={handleSelectKlass} key={klasse.id} />)}
            </div>
        </main>
    );
}

export default App;
