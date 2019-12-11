import React from "react";
import "./styles.css";
import apiBaseUrl from "../../utils/apiBaseUrl";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";

const Analysis = props => {
  const constructWatsonData = object => {
    const array = Object.keys(object).map((key, index) => {
      return {
        id: key,
        label: key,
        value: Math.round(object[key] * 100) / 100
      };
    });
    return array;
  };

  const constructSpotifyData = object => {
    const simpleObject = {
      acousticness: object.acousticness,
      danceability: object.danceability,
      energy: object.energy,
      instrumentalness: object.instrumentalness,
      liveness: object.liveness,
      speechiness: object.speechiness,
      valence: object.valence
    };

    return constructWatsonData(simpleObject);
  };

  const MyResponsiveBar = () => {
    const barColors = {
      acousticness: "#e41a1d",
      danceability: "#377eb7",
      energy: "#4daf4a",
      instrumentalness: "#984ea3",
      liveness: "#ff7f02",
      speechiness: "#feff32",
      valence: "#dd4b40"
    };

    return (
      <ResponsiveBar
        data={constructSpotifyData(props.spotify)}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={constructSpotifyData(props.spotify).map(c => barColors[c.id])}
        colorBy="index"
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Features",
          legendPosition: "middle",
          legendOffset: 32,
          color: "#fff"
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Value",
          legendPosition: "middle",
          legendOffset: -40,
          color: "#fff"
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["brighter", 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    );
  };

  const MyResponsivePie = () => (
    <ResponsivePie
      data={constructWatsonData(props.watson)}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: "paired" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#ffffff"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: "color" }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#ffffff"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#fff",
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000"
              }
            }
          ]
        }
      ]}
    />
  );

  return (
    <div className="analysisInner">
      <div className="pie">{MyResponsivePie()}</div>
      <div className="bar">{MyResponsiveBar()}</div>
    </div>
  );
};

export default Analysis;
