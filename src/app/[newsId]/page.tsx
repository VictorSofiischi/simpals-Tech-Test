'use client';
import { useQuery, gql } from '@apollo/client';
import Image from 'next/image';
import PointSvg from '../../../public/pointSvg.svg'
import LoadingPage from '../loadingPage';
import Link from 'next/link';
import { ContentDescriptionCut, ContentTitle, MainBox, MainDiv } from '../../styles/newsDetailStyles'

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
            <Link href={"/"}>
                <Image
                    src={PointSvg}
                    alt='Point Logo'
                    width={width !== 0 ? (width * 20) / 100 : 100}
                />
            </Link>
            <MainBox>
                <ContentTitle>{response.content.title.short}</ContentTitle>
                <ContentDescriptionCut dangerouslySetInnerHTML={{ __html: response.content.description.long }} />
            </MainBox>
        </MainDiv>
    );
}

export default NewsDetailPage