import React, { useState } from 'react';
import './style.scss';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';

import Sentiment from 'sentiment';
const sentiment = new Sentiment();

const Chatbot = () => {
    const { getValues, register } = useForm()

    const [tableDataLoading, setTableDataLoading] = useState(false)
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'user': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'date': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'message': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'emotion': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const [filter, setFilter] = useState('');


    const data = [
        { user: 'User1', date: '2023-10-01 10:00', message: 'Hello, how can I help you?', emotion: 'Neutral' },
        { user: 'User2', date: '2023-10-01 10:05', message: 'I need assistance with my order.', emotion: 'Frustrated' },
        { user: 'User3', date: '2023-10-01 10:10', message: 'What are your hours of operation?', emotion: 'Curious' },
        { user: 'User4', date: '2023-10-01 10:15', message: 'Can you tell me about your services?', emotion: 'Interested' },
        { user: 'User5', date: '2023-10-01 10:20', message: 'I have a complaint about my last purchase.', emotion: 'Angry' },
        { user: 'User6', date: '2023-10-01 10:25', message: 'Thank you for your help!', emotion: 'Grateful' },
        { user: 'User7', date: '2023-10-01 10:30', message: 'I would like to speak to a manager.', emotion: 'Frustrated' },
        { user: 'User8', date: '2023-10-01 10:35', message: 'What is your return policy?', emotion: 'Inquisitive' },
        { user: 'User9', date: '2023-10-01 10:40', message: 'I am having trouble logging in.', emotion: 'Confused' },
        { user: 'User10', date: '2023-10-01 10:45', message: 'Can you help me reset my password?', emotion: 'Hopeful' },
    ];


    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
        setTableDataLoading(false)
    };


    const renderHeader = () => {
        return (
            <>
                <h4>CHAT TRANSCRIPTS</h4>
                <div style={{ display: "flex", gap: "1rem" }} className="right-section">
                    <div className="p-inputgroup flex-1">
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                        <Button loading={tableDataLoading} icon="pi pi-search" className='pr ' />
                    </div>
                </div>
            </>
        );
    };
    const header = renderHeader()

    const rowFilterTemplate = (opt, formField) => {
        return <>
            <div className="p-inputgroup flex-1">
                <InputText {...register(formField)} placeholder="Keyword Search" />
                <Button loading={tableDataLoading} onClick={() => submitFilterHandler()} icon="pi pi-search" className='pr ' />
            </div>
        </>
    };

    const renderEmotionBody = (data) => {
        const emotion = sentiment.analyze(data.message)
        const output = getSentimentLabel(emotion.score)
        return <p>{output}</p>
    }

    return (
        <div className='Chatbot'>
            <div className="header">
                <h3>CHAT MESSAGE ANALYSIS</h3>
                <div className="box">
                    <img height={200} width={450} src='/assets/Chatbot.png' alt='image' />
                </div>
            </div>
            <div className="data-table">
                <div className="table">
                    <DataTable value={data} showGridlines
                        globalFilterFields={["user", "date", "message", "emotion"]}
                        header={header}
                        filterDisplay="row"
                        paginator rows={5}
                        removableSort
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        pt={{
                            root: { className: "pr" },
                            headerRow: { className: "pr" },
                        }}
                        filters={filters}>
                        <Column
                            sortable
                            filter filterElement={(options) => rowFilterTemplate(options, "user")}
                            field="user" header="User" />
                        <Column
                            sortable
                            filter filterElement={(options) => rowFilterTemplate(options, "date")}
                            field="date" header="Date-Time" />
                        <Column
                            sortable
                            filter filterElement={(options) => rowFilterTemplate(options, "message")}
                            field="message" header="Message Preview" />
                        <Column
                            sortable
                            body={renderEmotionBody}
                            filter filterElement={(options) => rowFilterTemplate(options, "emotion")}
                            field="emotion" header="Emotion" />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}



const getSentimentLabel = (score) => {
    if (score > 5) {
        return 'Interested';
    } else if (score > 0) {
        return 'Curious';
    } else if (score === 0) {
        return 'Neutral';
    } else if (score >= -5) {
        return 'Frustrated';
    } else {
        return 'Angry';
    }
};

export default Chatbot;
