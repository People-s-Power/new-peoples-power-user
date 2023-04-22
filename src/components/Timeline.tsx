import { useEffect, useState } from "react"
import { ADVERT } from "apollo/queries/advertsQuery"
import { VICTORY } from "apollo/queries/victories"
import { GET_POST } from "apollo/queries/postQuery"
import { EVENT } from "apollo/queries/eventQuery"

import { SERVER_URL } from "utils/constants"
import { print } from "graphql"
import axios from "axios"
import AdvertsComp from "./AdvertsCard"
import EventsCard from "./EventsCard"
import CampComp from "./CampComp"

const Timeline = ({ item }: { item: any }) => {
  const [data, setData] = useState(null)

  const fetchAdvert = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(ADVERT),
        variables: {
          advertId: item.itemId,
        },
      })
      console.log(data)
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
          id: item.itemId,
        },
      })
      console.log(data)
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
          id: item.itemId,
        },
      })
      console.log(data)
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
          eventId: item.itemId,
        },
      })
      console.log(data)
      setData(data.data.event)
    } catch (e) {
      console.log(e.response)
    }
  }
  useEffect(() => {
    if (item.event === "Created-Advert") {
      fetchAdvert()
    } else if (item.event === "Created-Victory") {
      fetchVictory()
    } else if (item.event === "Created-Petition") {

    } else if (item.event === "Created-Post") {
      fetchPost()
    }
    else if (item.event === "Created-Event") {
      fetchEvent()
    }
  }, [])
  return (
    <div>
      <div>
        {(() => {
          switch (item.event) {
            case "Created-Advert":
              return <div>
                <div className="flex p-3 border">
                  <img className="rounded-full w-10 h-10 mr-4" src={item.authorImage} alt="" />
                  <div className="my-auto text-sm">{item.message}</div>
                </div>
                {data && <AdvertsComp advert={data} />}
              </div>
            case "Created-Victory":
              return (
                <div>
                  {/* <div className="flex p-3 border">
                    <img className="rounded-full w-10 h-10 mr-4" src={item.authorImage} alt="" />
                    <div className="my-auto text-sm">{item.message}</div>
                  </div> */}
                </div>
              )
            case "Created-Petition":
              return <div>
                {/* <div className="flex p-3 border">
                  <img className="rounded-full w-10 h-10 mr-4" src={item.authorImage} alt="" />
                  <div className="my-auto text-sm">{item.message}</div>
                </div> */}
              </div>
            case "Created-Post":
              return <div>
                <div className="flex p-3 border">
                  <img className="rounded-full w-10 h-10 mr-4" src={item.authorImage} alt="" />
                  <div className="my-auto text-sm">{item.message}</div>
                </div>
                {data && <CampComp post={data} />}
              </div>
            case "Created-Event":
              return (
                <div>
                  <div className="flex p-3 border">
                    <img className="rounded-full w-10 h-10 mr-4" src={item.authorImage} alt="" />
                    <div className="my-auto text-sm">{item.message}</div>
                  </div>
                  {data && <EventsCard event={data} />}
                </div>
              )
          }
        })()}
      </div>
    </div>
  )
}
export default Timeline