'use client';
import styled from "styled-components";
import { useEffect, useState } from 'react'

type ItemProps = {
    title: string,
    description: string,
    time: number,
    id: string
}

const FlexRowDiv = styled.a`
    display: flex;
    flex-direction: row;
`;

const TitleDescriptionTimeDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const ContentTitle = styled.p`
    display: flex;
    flex-wrap: wrap;
    margin-left: 25px;
    font-weight: bold;
    font-size: 35px;
    color: #000000;
`;

const ContentDescriptionCut = styled.span`
    color: #000000;
    margin-left: 25px;
    font-size: 18px
`;

const FakeImage = styled.div`
    background-color: #f3f3f3;
    max-width: 20%;
    width: 100%;
    height: 190px;
`;

const ContentTime = styled.span`
    margin-left: 25px;
    color: #c9c9c9;
`

const ItemComponent = ({ title, description, time, id }: ItemProps) => {

    const [parsedDescription, setParsedDescription] = useState<string>('')
    const [timeState, setTimeState] = useState<string>('')

    const getFirstParagraph = () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(description, 'text/html');
        const firstParagraph = doc.querySelector('p');
        let neededString = firstParagraph?.innerHTML || '';
        if (neededString.length > 150) {
            neededString = neededString.slice(0, 150) + "...";
        }
        setParsedDescription(neededString)
    }

    const getHumanTime = () => {
        const now = Math.floor(new Date().getTime() / 1000)
        let timeSpent = now - time;
        timeSpent = Math.floor(timeSpent / 60);
        if (timeSpent < 60) {
            return timeSpent.toString() + " минут назад";
        }
        timeSpent = Math.floor(timeSpent / 60);
        if (timeSpent < 24) {
            if (timeSpent === 1) {
                return timeSpent.toString() + " час назад";
            }
            return timeSpent.toString() + " часов назад";
        }
        timeSpent = Math.floor(timeSpent / 24);
        return timeSpent.toString() + " дней назад";

    }

    useEffect(() => {
        getFirstParagraph()
        setTimeState(getHumanTime())
    }, [])

    return (
        <FlexRowDiv href={`/${id}`}>
            <FakeImage />
            <TitleDescriptionTimeDiv>
                <ContentTitle dangerouslySetInnerHTML={{ __html: title }} />
                <ContentDescriptionCut dangerouslySetInnerHTML={{ __html: parsedDescription }} />
                <ContentTime>{timeState}</ContentTime>
            </TitleDescriptionTimeDiv>
        </FlexRowDiv>
    );
}

export default ItemComponent
