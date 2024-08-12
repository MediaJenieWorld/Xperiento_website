import PostCard from "@/components/ui/dashboard/PostCard/PostCard";
import "./styles.scss";
import LikeDislikeFooter from "@/components/ui/dashboard/PostCard/LikeDislikeFooter";
import { getInsights } from "@/api/Zensight/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ErrorPage from "@/ErrorPage";

const MyInsightsPage = () => {
  const [insightsData, setInsightsArray] = useState(null);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    race: "",
    age: "",
    skip: 0
  });

  useEffect(() => {
    loadMoreInsights(true);
  }, [activeFilters]);

  async function loadMoreInsights(isfilterChange) {
    let skip = insightsData !== null ? insightsData.data.length : 0;
    if (isfilterChange) {
      skip = 0
    }
    const query = generateQuery({ ...activeFilters, skip });
    const response = await getInsights(query);
    const res = response.data;
    if (response.status === 200) {
      if (res.data.length == 0) {
        toast.error("No more insights to show");
      }
      if (insightsData !== null && !isfilterChange) {
        setInsightsArray({
          ...insightsData,
          data: [...insightsData.data, ...res.data],
        });
      } else {
        setInsightsArray(res);
      }
    } else {
      setError(res.data);
      toast.error(response?.data.data);
    }
  }

  if (error && insightsData == null) {
    return <ErrorPage message={error} />;
  }
  if (insightsData == null) {
    return <h1>Loading</h1>;
  }

  const raceFilter = [
    { label: "select race", value: "" },
    { label: "Asian", value: "Asian" },
    { label: "American", value: "American" },
    { label: "European", value: "European" },
    { label: "Hispanic", value: "Hispanic" },
    { label: "African", value: "African" },
    { label: "Alaska Native", value: "Alaska Native" },
    { label: "Latino", value: "Latino" },
  ]

  const ageFilter = [
    { label: "select age group", value: "" },
    { label: "Age Group 25-35", value: "25-35" },
    { label: "Age Group 35-55", value: "35-55" },
    { label: "Age Group 55-65", value: "55-65" },
    { label: "Age Group 65-75", value: "65-75" },
  ]

  function filterChangeHandler(key, value) {
    setActiveFilters(pre => {
      const newObj = { ...pre }
      newObj[key] = value
      return newObj
    })
  }
  return (
    <div className="MyInsights">
      <div className="header">
        <div className="title">
          <h3>
            {" "}
            <span>SMART INSIGHTS TO</span>
            <br />
            Transform Your Business
          </h3>
        </div>
        <div className="flex">
          <img
            src={"/assets/dashboard/restaurant.png"}
            height={60}
            width={60}
            alt="restaurant"
          />
          <img
            src={"/assets/dashboard/cafe.png"}
            height={60}
            width={60}
            alt="cafe"
          />
        </div>
      </div>
      <div className="Info_and_Filter">
        <h3>
          Total  <i>
            <span>{insightsData.totalInsights} Insights</span>
          </i>
        </h3>
        <div className="filter_div">
          <select name="race_filter" id="race_filter" value={activeFilters.race} onChange={(e) => filterChangeHandler("race", e.target.value)}>
            {
              raceFilter.map((opt) => {
                return <option key={opt.value} value={opt.value}>{opt.label}</option>
              })
            }
          </select>

          <select name="age_filter" id="age_filter" value={activeFilters.age} onChange={(e) => filterChangeHandler("age", e.target.value)}>
            {
              ageFilter.map((opt) => {
                return <option key={opt.value} value={opt.value}>{opt.label}</option>
              })
            }
          </select>
        </div>
      </div>
      <div className="latestInsights">
        <div className="list">
          {insightsData?.data?.map((insight, i) => {
            return (
              <PostCard
                footer={<LikeDislikeFooter data={insight} />}
                key={i}
                data={insight}
              />
            );
          })}
          <div className="centered">
            {insightsData.totalInsights === insightsData.data.length ? (
              <button
                style={{
                  margin: 0,
                  width: "max-content",
                  padding: "10px 20px",
                }}
                className="start"
              >
                No more insights to show
              </button>
            ) : (
              <button
                onClick={loadMoreInsights}
                style={{
                  margin: 0,
                }}
                className="start"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInsightsPage;

function generateQuery(activeFilters) {
  const query = Object.keys(activeFilters)
    .map(key => {
      if (activeFilters[key] !== "") {
        return `${key}=${activeFilters[key]}`;
      }
      return '';
    })
    .filter(Boolean)
    .join('&');

  return query;
}

