import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import FrontLayout from 'layout/FrontLayout';
import AdvertsComp from 'components/AdvertsCard';
import EventsCard from 'components/EventsCard';
import PetitionComp from 'components/PetitionCard';
import VictoryCard from 'components/VictoryCard';
import CampComp from 'components/CampComp';
import Updates from 'components/updates';
import axios from 'axios';
import { SERVER_URL } from 'utils/constants';
import { ADVERT } from 'apollo/queries/advertsQuery';
import { VICTORY } from 'apollo/queries/victories';
import { GET_POST } from 'apollo/queries/postQuery';
import { EVENT } from 'apollo/queries/eventQuery';
import { print } from "graphql"
import { UPDATES } from 'apollo/queries/generalQuery';
import { SINGLE_PETITION, SINGLE_PETITION_ID } from 'apollo/queries/petitionQuery';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Head } from 'next/document';
import { ICampaign } from 'types/Applicant.types';


export const getServerSideProps: GetServerSideProps<{ repo: ICampaign }> = async (ctx) => {
  const slug = ctx?.query?.slug
  const page = ctx?.query?.page
  let single

  const fetchAdvert = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(ADVERT),
        variables: {
          advertId: page,
        },
      })
      // console.log(data)
      single = data.data.advert
    } catch (e) {
      console.log(e.response)
    }
  }

  const fetchVictory = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(VICTORY),
        variables: {
          id: page,
        },
      })
      // console.log(data)
      single = data.data.victory
    } catch (e) {
      console.log(e.response)
    }
  }
  const fetchPost = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(GET_POST),
        variables: {
          id: page,
        },
      })
      // console.log(data)
      single = data.data.getPost
    } catch (e) {
      console.log(e.response)
    }
  }

  const fetchEvent = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(EVENT),
        variables: {
          eventId: page,
        },
      })
      console.log(data)
      single = data.data.event
    } catch (e) {
      console.log(e.response)
    }
  }
  const fetchUpdate = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(UPDATES),
        variables: {
          id: page,
        },
      })
      console.log(data)
      single = data.data.getUpdate
    } catch (e) {
      console.log(e.response)
    }
  }

  const petition = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(SINGLE_PETITION_ID),
        variables: {
          id: page,
        },
      })
      console.log(data)
      single = data.data.getPetitionByID
    } catch (e) {
      console.log(e.response)
    }
  }

  if (slug === "Advert") {
    fetchAdvert()
  } else if (slug === "Victory") {
    fetchVictory()
  } else if (slug === "Post") {
    fetchPost()
  }
  else if (slug === "Event") {
    fetchEvent()
  }
  else if (slug === "Update") {
    fetchUpdate()
  }
  else if (slug === "Petition") {
    petition()
  }

  return {
    props: {
      repo: single
    },
  };
}

const Single = ({ repo, }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [single, setData] = useState<any>(null)
  // console.log(router);


  const fetchAdvert = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(ADVERT),
        variables: {
          advertId: router.query.page,
        },
      })
      // console.log(data)
      setData(data.data.advert)
    } catch (e) {
      console.log(e.response)
    }
  }

  const fetchVictory = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(VICTORY),
        variables: {
          id: router.query.page,
        },
      })
      // console.log(data)
      setData(data.data.victory)
    } catch (e) {
      console.log(e.response)
    }
  }
  const fetchPost = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(GET_POST),
        variables: {
          id: router.query.page,
        },
      })
      // console.log(data)
      setData(data.data.getPost)
    } catch (e) {
      console.log(e.response)
    }
  }

  const fetchEvent = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(EVENT),
        variables: {
          eventId: router.query.page,
        },
      })
      console.log(data)
      setData(data.data.event)
    } catch (e) {
      console.log(e.response)
    }
  }
  const fetchUpdate = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(UPDATES),
        variables: {
          id: router.query.page,
        },
      })
      console.log(data)
      setData(data.data.getUpdate)
    } catch (e) {
      console.log(e.response)
    }
  }

  const petition = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(SINGLE_PETITION_ID),
        variables: {
          id: router.query.page,
        },
      })
      console.log(data)
      setData(data.data.getPetitionByID)
    } catch (e) {
      console.log(e.response)
    }
  }

  useEffect(() => {
    // console.log(router.query)
    if (router.query.slug === "Advert") {
      fetchAdvert()
    } else if (router.query.slug === "Victory") {
      fetchVictory()
    } else if (router.query.slug === "Post") {
      fetchPost()
    }
    else if (router.query.slug === "Event") {
      fetchEvent()
    }
    else if (router.query.slug === "Update") {
      fetchUpdate()
    }
    else if (router.query.slug === "Petition") {
      petition()
    }
  })

  return (
    <Fragment>
      <Head>
        <title>{repo?.__typename} || {repo?.title}</title>
        <meta name="description" content={repo?.body} />
        <meta name="image" content={repo?.asset[0]} />
      </Head>
      <FrontLayout showFooter={false}>
        <div className='lg:w-1/2 sm:p-6 mx-auto'>
          {(() => {
            switch (router.query.slug) {
              case "Advert":
                return (
                  <div>
                    {single !== null ? <AdvertsComp advert={single} /> : null}
                  </div>
                )
              case "Event":
                return (
                  <div>
                    {single !== null ? <EventsCard event={single} /> : null}
                  </div>
                )
              case "Petition":
                return (
                  <div>
                    {single !== null ? <PetitionComp petition={single} /> : null}
                  </div>
                )
              case "Victory":
                return (
                  <div>
                    {single !== null ? <VictoryCard post={single} /> : null}
                  </div>
                )
              case "Post":
                return (
                  <div>
                    {single && <CampComp post={single} />}
                  </div>
                )
              case "Update":
                return (
                  <div>
                    {single && <Updates updates={single} />}
                  </div>
                )
            }
          })()}
        </div>
      </FrontLayout>
    </Fragment>
  );
};

export default Single;