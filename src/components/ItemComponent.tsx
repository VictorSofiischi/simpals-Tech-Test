'use client';
import { useEffect, useState } from 'react'
import Image from "next/image";
import { ContentDescriptionCut, ContentTime, ContentTitle, FlexRowDiv, TitleDescriptionTimeDiv } from '../styles/itemComponentStyles'

type ItemProps = {
    title: string,
    description: string,
    time: number,
    id: string,
    thumbnail: string,
}

const ItemComponent = ({ title, description, time, id, thumbnail }: ItemProps) => {

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
    //https://i.simpalsmedia.com/point.md/news/370x194/
    return (
        <FlexRowDiv href={`/${id}`}>
            <Image
                src={"https://i.simpalsmedia.com/point.md/news/370x194/" + thumbnail}
                alt="some"
                width={370}
                height={194}
            />
            <TitleDescriptionTimeDiv>
                <ContentTitle dangerouslySetInnerHTML={{ __html: title }} />
                <ContentDescriptionCut dangerouslySetInnerHTML={{ __html: parsedDescription }} />
                <ContentTime>{timeState}</ContentTime>
            </TitleDescriptionTimeDiv>
        </FlexRowDiv>
    );
}

export default ItemComponent
