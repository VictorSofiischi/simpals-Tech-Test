'use client';
import { useQuery, gql } from '@apollo/client';
import Image from 'next/image';
import styled from 'styled-components'
import PointSvg from '../../../public/pointSvg.svg'
import LoadingPage from '../loadingPage';

const MainDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
background-color: #f5f5f5;
padding-bottom: 30px;
height: 100%;
`;

const MainBox = styled.div`
  background-color: white;
  padding-top: 30px;
  padding-left: 3%;
  padding-right: 3%;
  border-radius: 18px;
  padding-bottom: 30px;
  width: 80%;
  align-items: center;
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
    font-size: 25px;
    text-align: center;
`;

let width = 0;

const NewsDetailPage = ({ params }: { params: { newsId: string } }) => {
    const GET_DATA = gql`{
        content(id: "${params.newsId}",
          project_id: "2b2667a9-b0d9-43ab-8bfa-7e61fc76fe2c",
          full_url: "business/simpals-novye-rabochie-mesta-dlia-vsekh-zhelaiushchikh") 
        {
          title {
            short
          }
              description{
            long
          }
        }
      }`;

    const { loading, error, data } = useQuery(GET_DATA);

    const response = data;

    if (typeof window !== 'undefined') {
        width = window.innerWidth;
    }

    if (loading) return <LoadingPage />
    if (error) return <p>Error: {error.message}</p>;

    return (
        <MainDiv>
            <Image
                src={PointSvg}
                alt='Point Logo'
                width={width !== 0 ? (width * 20) / 100 : 100}
            />
            <MainBox>
                <ContentTitle>{response.content.title.short}</ContentTitle>
                <ContentDescriptionCut dangerouslySetInnerHTML={{ __html: response.content.description.long }} />
            </MainBox>
        </MainDiv>
    );
}

export default NewsDetailPage