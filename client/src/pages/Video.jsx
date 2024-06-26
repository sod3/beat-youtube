import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import { format } from "timeago.js";
import Recommendation from "../components/Recommendation";
import { Helmet } from "react-helmet";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  background-color: ${({ active }) => (active ? "#cc1a00" : "#f1f1f1")};
  color: ${({ active }) => (active ? "white" : "black")};
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 30px;
  &:hover {
    background-color: #cc1a00;
    color: white;
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DescriptionExpand = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];
  console.log("Video ID:", path); // Log the video ID

  const [channel, setChannel] = useState({});
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching video with ID:", path); // Log the video ID
        const videoRes = await axios.get(`/videos/find/${path}`);
        console.log("Video Response:", videoRes.data); // Log the video response
        if (!videoRes.data) {
          console.error("Video not found");
          return;
        }
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
        console.log("Channel Response:", channelRes.data); // Log the channel response
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    try {
      await axios.put(`/users/like/${currentVideo._id}`);
      dispatch(like(currentUser._id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    try {
      await axios.put(`/users/dislike/${currentVideo._id}`);
      dispatch(dislike(currentUser._id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSub = async () => {
    try {
      console.log(channel); // Debug log
      if (channel._id) {
        currentUser.subscribedUsers.includes(channel._id)
          ? await axios.put(`/users/unsub/${channel._id}`)
          : await axios.put(`/users/sub/${channel._id}`);
        dispatch(subscription(channel._id));
      } else {
        console.error("Channel ID is undefined");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDescriptionToggle = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };

  return (
    <Container>
      <Helmet>
        <title>{currentVideo?.title || "Video"}</title>
        <meta name="description" content={currentVideo?.desc || "Watch this amazing video"} />
        <meta name="keywords" content={currentVideo?.tags?.join(", ") || "video, sharing, YouConect ,platform"} />
        <link rel="canonical" href={`https://youconect.com/videos/${path}`} />
        <meta property="og:title" content={currentVideo?.title || "Video"} />
        <meta property="og:description" content={currentVideo?.desc || "Watch this amazing video"} />
        <meta property="og:url" content={`https://youconect.com/videos/${path}`} />
        <meta property="og:image" content={currentVideo?.thumbnailUrl || "https://youconect.com/default-thumbnail.png"} />
        <meta property="og:type" content="video.other" />
      </Helmet>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views • {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button
              onClick={handleLike}
              active={currentVideo?.likes?.includes(currentUser?._id)}
            >
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button
              onClick={handleDislike}
              active={currentVideo?.dislikes?.includes(currentUser?._id)}
            >
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} loading="lazy" alt={`${channel.name}'s channel logo`} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>
                {descriptionExpanded
                  ? currentVideo?.desc
                  : currentVideo?.desc?.substring(0, 100)}
              </Description>
              {currentVideo?.desc?.length > 100 && (
                <DescriptionExpand onClick={handleDescriptionToggle}>
                  {descriptionExpanded ? "Show Less" : "Show More"}
                </DescriptionExpand>
              )}
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser?.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;
