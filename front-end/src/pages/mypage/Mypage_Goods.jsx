import React, {useState, useEffect, useRef}from 'react';
import styled from "styled-components";
import Butt from '../../components/Butt'
import { useRecoilValue} from 'recoil';
import { userState } from '../../atoms/userState';
import { getMyGoodsList } from '../../api/GoodsApiService';
import { useInView } from 'react-intersection-observer';

const Inner = styled.div`
    width: 70%;
    @media (max-width: 1000px){
        width: 90%;
        }
    @media (max-width: 639px){
        width: 90%;
        }
`
const GoodsCard = styled.div`
    /* border: 1px solid blue; */
    width: 100%;
    /* height: 15%; */
    height: 120px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 1000px){
        width: 90%;
        }
    @media (max-width: 639px){
        width: 99%;
        }
`
const CardInner = styled.div`
    /* border: 1px solid red; */
    width: 97%;
    height: 90%;
    border-radius: 15px;
    display: flex;
`
const GoodsPhoto = styled.div`
    /* border: 1px solid blue; */
    border-radius: 15px;
    min-width: 110px;
    height: 100%;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const GoodsContext = styled.div`
    /* border: 1px solid orange; */
    height: 100%;
    width: 55%;
    margin-left: 5%;
    padding-top: 2%;
    @media (max-width: 639px){
        width: 40%;
    }
`
const GoodsContextState = styled.p`
    /* border: 1px solid orange; */
    margin:0;
    color: #FF9900;
    font-weight: bold;
`
const GoodsContextTitle = styled.p`
    /* border: 1px solid orange; */
    margin:0;
    font-weight: bold;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const GoodsContextPrice = styled.p`
    /* border: 1px solid orange; */
    margin:0;
    padding-top: 1%;
`
const ButtDiv = styled.div`
    /* border: 1px solid red; */
    width: auto;
    height: 100%;
    display: flex;
    align-items: end;
    margin-left: auto;
` 
const Mypage_Goods = () => {
    const user = useRecoilValue(userState); //아톰이
    console.log(user);
    const [goodsList,setGoodsList] = useState([]);

    const { ref, inView } = useInView({ threshold: 0.5 }); // Infinite Scroll을 위한 useRef와 useInView hook
    const prevInView = useRef(false); // useRef를 사용하여 이전 inView 값을 기억
    const [listShow, setListShow] = useState(8); // 한 번에 보여줄 아이템 수

      useEffect(() => {
        getMyGoodsList(user.accountId)
        .then(res => {
            console.log(res);
            setGoodsList(res.data.result);
                })
          .catch(e => {
            console.log(e);
          })
      }, []);
      
      useEffect(() => {
        //nView 값 변경시 itemsShow 업데이트
        if (inView && !prevInView.current) {
            setListShow(prevItems => prevItems + 8);
        }
        prevInView.current = inView;

    }, [inView]);



    return (
        <div style={{height:'100%', display: 'flex', justifyContent:'center'}}>
            <Inner>
            {goodsList?.slice(0, listShow).map((item, index) =>(
                    <GoodsCard>
                    <CardInner>
                    <GoodsPhoto><img src='{item && item.images}'></img></GoodsPhoto>
                    <GoodsContext>
                        <GoodsContextState>{item?.title}</GoodsContextState>
                        <GoodsContextTitle>{item?.description}</GoodsContextTitle>
                        <GoodsContextPrice>입찰 금액 :{item?.currentBidPrice} 원</GoodsContextPrice>
                    </GoodsContext>
                    <ButtDiv><Butt cursor="pointer" width="auto">배송</Butt> </ButtDiv>
                    </CardInner>
                    </GoodsCard>
            )
            )}
            <div ref={ref} /> {/* inView Scroll 생성 위치 */}
            </Inner>
        </div>
    );
};

export default Mypage_Goods;