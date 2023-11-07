'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useQuery, gql } from '@apollo/client';
import ItemComponent from '@/components/ItemComponent';
import PointSvg from '../../public/pointSvg.svg'
import { AllPageContainer, ContentContainer, DayTitle, MainBox } from "../styles/mainStyles"
import LoadingPage from './loadingPage';



let width = 0;
let globalPageHeight = typeof document !== "undefined" ? document.documentElement.scrollHeight : 0;

export default function Home() {
  const [skipValue, setSkipValue] = useState(0)

  const GET_DATA = gql`{
    contents(project_id: "5107de83-f208-4ca4-87ed-9b69d58d16e1", lang: "ru", skip: ${skipValue}, take: 10) {
      id,
      title {
        short
      },
      description{
        cut
      },
      dates{
        updated
      },
      thumbnail
    }
  }
  `;

  const { loading, error, data, refetch } = useQuery(GET_DATA);
  const [responseDataAccumulator, setResponseDataAccumulator] = useState<any[]>([]);
  const [firstLoading, setFirstLoading] = useState(true);
  const mainBoxRef = useRef<HTMLDivElement>(null)

  const result = data;
  if (typeof window !== 'undefined') {
    width = window.innerWidth;
    window.addEventListener('scroll', () => {
      const pageHeight = document.documentElement.scrollHeight
      const clientHeight = window.scrollY;
      const screenHeight = window.innerHeight;
      if (pageHeight > globalPageHeight) {
        globalPageHeight = pageHeight;
      }
      if (clientHeight + screenHeight === pageHeight) {
        setSkipValue(prev => prev + 10);
      }
    })
  }


  useEffect(() => {
    refetch();
  }, [skipValue])

  useEffect(() => {
    if (!loading && !error) {
      setResponseDataAccumulator(prev => [...prev, ...result.contents])
      if (!firstLoading) {
        if (mainBoxRef.current) {
          mainBoxRef.current.scrollTo({ top: globalPageHeight - 1000, behavior: 'smooth' });
        }
      } else {
        setFirstLoading(false);
      }
    }
  }, [loading, error])

  if (loading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>;

  return (
    <AllPageContainer ref={mainBoxRef}>
      <Image
        src={PointSvg}
        alt='Point Logo'
        width={width !== 0 ? (width * 20) / 100 : 100}
      />
      <MainBox>
        <DayTitle>Сегодня</DayTitle>
        <ContentContainer>
          {responseDataAccumulator.sort((itemA, itemB) => {
            if (itemA.dates.updated > itemB.dates.updated) {
              return -1;
            }
            if (itemA.dates.updated < itemB.dates.updated) {
              return 1;
            }
            return 0;
          }).map(item => (
            <ItemComponent title={item.title.short} description={item.description.cut} time={item.dates.updated} key={item.id} id={item.id} thumbnail={item.thumbnail} />
          ))}
        </ContentContainer>
      </MainBox>
    </AllPageContainer>
  )
}
