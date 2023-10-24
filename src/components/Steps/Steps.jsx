import { useState } from 'react';

const Steps = () => {
    const [trainings, setTrainings] = useState([]);
    const [date, setDate] = useState('');
    const [distance, setDistance] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const existingTraining = trainings.find((training) => training.date === date);

        if (existingTraining) {
            const updatedTrainings = trainings.map((training) =>
                training.date === date ? { ...training, distance: training.distance + parseFloat(distance) } : training
            );
            setTrainings(updatedTrainings);
        } else {
            const newTraining = { date, distance: parseFloat(distance) };
            const updatedTrainings = [...trainings, newTraining];
            setTrainings(updatedTrainings);
        }

        setDate('');
        setDistance('');
    };

    const handleDelete = (date) => {
        const updatedTrainings = trainings.filter((training) => training.date !== date);
        setTrainings(updatedTrainings);
    };

    const handleEdit = (date) => {
        const trainingToEdit = trainings.find((training) => training.date === date);

        if (trainingToEdit) {
            setDate(trainingToEdit.date);
            setDistance(trainingToEdit.distance.toString());
        }
    };
    ///Стили
    const flexContainerStyle = {
        margin: "auto",
        width: "500px",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '10px',
    };

    const columnHeaderStyle = {
        fontWeight: 'bold',
        textAlign: 'center',
    };

    const dataContainerStyle = {
        margin: "auto",
        border: '1px solid black',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        width: '500px'
    };

    const inputContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10px',
    };

    const buttonStyle = {
        backgroundColor: 'white',
        borderRadius: '5px',
        border: '1px solid black',
        cursor: 'pointer',
        width: '60px'
    };

    const inputStyle = {
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '5px 10px',
        border: '1px solid black',
        cursor: 'pointer',
    };

    ///Стили


    return (
        <div>

            <form onSubmit={handleSubmit} style={flexContainerStyle}>
                <div style={inputContainerStyle}>
                    <label>Дата (ДД.ММ.ГГ):</label>
                    <input type="date" style={inputStyle} value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div style={inputContainerStyle}>
                    <label>Пройдено км:</label>
                    <input
                        type="number"
                        style={inputStyle}
                        step="0.1"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={buttonStyle}>ОК</button>
            </form>
            <div style={flexContainerStyle}>
                <div style={columnHeaderStyle}>Дата (ДД.ММ.ГГ)</div>
                <div style={columnHeaderStyle}>Пройдено км</div>
                <div style={columnHeaderStyle}>Действия</div>
            </div>
            <div style={dataContainerStyle}>
                {trainings.map((training) => (
                    <div key={training.date} style={flexContainerStyle}>
                        <div>{training.date}</div>
                        <div>{training.distance.toFixed(1)}</div>
                        <div>
                            <button style={buttonStyle} onClick={() => handleEdit(training.date)}>✎</button>
                            <button style={buttonStyle} onClick={() => handleDelete(training.date)}>✘</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Steps;