import { useState } from "react";
import KOItem from "./components/KOItem";
import { HexColorPicker } from "react-colorful";

function App() {

    const [klassen, setKlassen] = useState<Klasse[]>([]);
    const [selectedKlasse, setSelectedKlasse] = useState<number>(0);
    const [projectSettings, setProjectSettings] = useState<boolean>(true);
    const [projectTitle, setProjectTitle] = useState<string>("New Project");
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const handleSwitchSettings = () => {
        setProjectSettings(true);
        setSelectedKlasse(0);
    }

    // Handle Saving and Loading
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const lfile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const jsonFile = JSON.parse(event.target?.result as string);

                    handleProjectNameChange(jsonFile.title);

                    // Load Klassen
                    setKlassen(jsonFile.klassen.map((klasse: any) => {
                        return {
                            id: klasse.id,
                            name: klasse.name,
                            attributes: klasse.attributes,
                            methodes: klasse.methodes,
                            color: klasse.color,
                        }
                    }));
                }
            }
            reader.readAsText(lfile);

        }
    };

    const getExportData = () => {
        const data = {
            title: projectTitle,
            klassen: klassen.map(klasse => {
                return {
                    id: klasse.id,
                    name: klasse.name,
                    attributes: klasse.attributes,
                    methodes: klasse.methodes,
                    color: klasse.color,
                }
            })
        };

        return data;
    }

    const handleExportJSON = () => {
        const data = getExportData();
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = projectTitle+".json";

        link.click();
        // console.log(jsonString);
    }

    // Handle Class
    const handleAddClass = () => {
        const newId = Date.now();
        setKlassen([...klassen, {
            id: newId, name: "", attributes: [], methodes: [], color: { bgcolor: "#5DADE2", fgcolor: "#000000" }
        }]);
        handleSelectKlass(newId);
        setProjectSettings(false);
    }

    const handleSelectKlass = (id: number) => {
        setSelectedKlasse(id);
        setProjectSettings(false);
    }

    const handleDeleteClass = (klasseId: number) => {
        setKlassen(klassen.filter(klasse => klasse.id !== klasseId));
        handleSelectKlass(0);
        setProjectSettings(true);
    }

    // Handle Attributes
    const handleAddAttributes = (klasseId: number) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return { id: klasse.id, name: klasse.name, attributes: [...klasse.attributes, { id: Date.now(), name: "" }], methodes: klasse.methodes, color: klasse.color };
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
                    }), methodes: klasse.methodes, color: klasse.color
                };
            }
            return klasse;
        }));
    }

    const handleAttributeDelete = (klasseId: number, id: number) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return { id: klasse.id, name: klasse.name, attributes: klasse.attributes.filter(attribute => attribute.id !== id), methodes: klasse.methodes, color: klasse.color };
            }
            return klasse;
        }));
    }

    // Handle Methodes
    const handleAddMethodes = (klasseId: number) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return { id: klasse.id, name: klasse.name, attributes: klasse.attributes, methodes: [...klasse.methodes, { id: Date.now(), name: "" }], color: klasse.color };
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
                    }), color: klasse.color
                };
            }
            return klasse;
        }));
    }

    const handleMethodDelete = (klasseId: number, id: number) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return { id: klasse.id, name: klasse.name, attributes: klasse.attributes, methodes: klasse.methodes.filter(method => method.id !== id), color: klasse.color };
            }
            return klasse;
        }));
    }

    // Handle Name
    const handleNameChange = (klasseId: number, newName: string) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return { id: klasse.id, name: newName, attributes: klasse.attributes, methodes: klasse.methodes, color: klasse.color }
            }
            return klasse;
        }))
    }

    // Handle Color
    const handleBgColorChange = (klasseId: number, newColor: string) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return { id: klasse.id, name: klasse.name, attributes: klasse.attributes, methodes: klasse.methodes, color: { bgcolor: newColor, fgcolor: klasse.color.fgcolor } }
            }
            return klasse;
        }))
    }

    const handleFgColorChange = (klasseId: number, newColor: string) => {
        setKlassen(klassen.map(klasse => {
            if (klasse.id === klasseId) {
                return { id: klasse.id, name: klasse.name, attributes: klasse.attributes, methodes: klasse.methodes, color: { bgcolor: klasse.color.bgcolor, fgcolor: newColor } }
            }
            return klasse;
        }))
    }

    const handleProjectNameChange = (newName: string) => {
        setProjectTitle(newName);
        const target = document.getElementById("project-title");
        if (target) target.innerHTML = newName;
    }

    return (
        <main data-theme={isDarkMode ? "dark" : "light"}>
            <div className="panel">
                <button className="active-btn accent-btn" onClick={() => handleSwitchSettings()}>Project Settings</button>
                {!projectSettings ? <>
                    <button className="active-btn" onClick={() => handleAddClass()}>Add New Class</button>
                    <hr />
                    <p>Name</p>
                    <input className="spec-input" placeholder="Name" value={klassen.find(klasse => klasse.id === selectedKlasse)?.name} onChange={e => handleNameChange(selectedKlasse, e.target.value)} />
                    <p>Attributes</p>
                    <div className="input-list">
                        {klassen.find(klasse => klasse.id === selectedKlasse)?.attributes.map(attribute =>
                            <div key={attribute.id}>
                                <input placeholder="example :/= type" value={attribute.name} onChange={e => handleAttributesChange(selectedKlasse, attribute.id, e.target.value)} />
                                <button className="deleteButton" onClick={() => handleAttributeDelete(selectedKlasse, attribute.id)}>X</button>
                            </div>
                        )
                        }
                    </div>
                    <button onClick={() => handleAddAttributes(selectedKlasse)}>+ Add Attribute</button>
                    <p>Methodes</p>
                    <div className="input-list">
                        {klassen.find(klasse => klasse.id === selectedKlasse)?.methodes.map(methode =>
                            <div key={methode.id}>
                                <input placeholder="method" value={methode.name} onChange={e => handleMethodesChange(selectedKlasse, methode.id, e.target.value)} />
                                <button className="deleteButton" onClick={() => handleMethodDelete(selectedKlasse, methode.id)}>X</button>
                            </div>
                        )}
                    </div>
                    <button onClick={() => handleAddMethodes(selectedKlasse)}>+ Add Method</button>
                    <p>Color</p>
                    <section className="small">
                        <HexColorPicker color={klassen.find(klasse => klasse.id === selectedKlasse)?.color.bgcolor} onChange={(e) => handleBgColorChange(selectedKlasse, e)} />
                    </section>
                    <p>Border Color</p>
                    <section className="small">
                        <HexColorPicker color={klassen.find(klasse => klasse.id === selectedKlasse)?.color.fgcolor} onChange={(e) => handleFgColorChange(selectedKlasse, e)} />
                    </section>
                    <button className="active-btn extra-delete" onClick={() => handleDeleteClass(selectedKlasse)}>Delete Class</button>
                </> :
                    <>
                        <button className="active-btn" onClick={() => handleAddClass()}>Add New Class</button>
                        <hr />
                        <p>Project Name</p>
                        <input className="spec-input" placeholder="New Project" value={projectTitle} onChange={(e) => handleProjectNameChange(e.target.value)} />
                        <p>Save</p>
                        <button className="active-btn" onClick={() => handleExportJSON()}>Save Project</button>
                        <p>Load Project</p>
                        <input id="file" type="file" onChange={handleFileChange} />
                        <p>Theme</p>
                        <button className="active-btn" onClick={() => setIsDarkMode(!isDarkMode)}>Change to {isDarkMode ? "light" : "dark"} mode</button>
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
