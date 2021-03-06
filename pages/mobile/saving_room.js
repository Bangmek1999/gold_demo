import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import React, { useState, useEffect } from "react";
import Refresh from "@material-ui/icons/Refresh";
import axios, { post } from "axios";
import { useRouter } from "next/router";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import Swal from "sweetalert2";
export default function LabelBottomNavigation() {
  const router = useRouter();

  const [his, His] = useState([{}]);
  const [ranking, Ranking] = useState([{}]);
  const [show_ranking, Show_ranking] = useState(false);
  const [fristsaving, Fristsaving] = useState(String);
  const [bonus, Bonus] = useState([{}]);
  const [show_bonus, Show_bonus] = useState(false);
  const [canceled, Canceled] = useState(false);
  const [price, Price] = useState(String);
  const [installment, Installment] = useState(String);
  const [total_savings, Total_savings] = useState(String);
  const [weight, Weight] = useState(String);
  const [total_installment, Total_installment] = useState(String);
  const [price_per_month,Price_per_month] = useState(Number);
  const [last_day, Last_day] = useState(String);

  const [balance, Balance] = useState(String);
  const [is_pending, Is_pending] = useState(false);
  const [is_empty, Is_empty] = useState(false);
  const [us_id, Us_id] = useState(localStorage.getItem("auth"));
  const [join_room_id, Join_room_id] = useState(
    localStorage.getItem("join_room")
  );
  useEffect(() => {
    LoadDataHis();
    RoomDetail();
    BonusDetail();
  }, []);

  const RefreshData = async () => {
    LoadDataHis();
    RoomDetail();
    BonusDetail();
  };
  const BonusDetail = async () => {
    var data = {
      user_id: us_id,
      room_id: join_room_id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/joinroom/bonus",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        // console.log(response.data.data);

        var total_user = response.data.data.length; //???????????????????????????????????????????????????????????? ??? ????????????????????????
        Fristsaving(total_user);
        var join_room = response.data.data;
        var saving_rooms_data = response.data.data[0].savingroom[0];
        var weight = saving_rooms_data.weight;
        var poin = 0;
        if (weight == "???????????????????????????") {
          var price_nomal = (saving_rooms_data.price - 900) * 8; //???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????(?????????)???????????????????????????????????????
          var divider = (10 / 20000) * price_nomal; /// ??????????????????
          poin = Math.ceil(saving_rooms_data.price) / divider;
        }
        if (weight == "1 ????????????") {
          var price_nomal = (saving_rooms_data.price - 1100) * 4; //???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????(?????????)???????????????????????????????????????
          var divider = (12 / 25000) * price_nomal; /// ??????????????????
          poin = Math.ceil(saving_rooms_data.price) / divider;
        }
        if (weight == "2 ????????????") {
          var price_nomal = (saving_rooms_data.price - 1400) * 2; //???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????(?????????)???????????????????????????????????????
          var divider = (20 / 26000) * price_nomal; /// ??????????????????
          poin = Math.ceil(saving_rooms_data.price) / divider;
        }
        if (weight == "1 ?????????") {
          var price_nomal = saving_rooms_data.price - 1750;
          var divider = (30 / 26000) * price_nomal; /// ??????????????????
          poin = Math.ceil(saving_rooms_data.price) / divider;
        }
        console.log("???????????????????????????????????????????????????????????????????????????????????? :" + poin);
        console.log("???????????????????????????????????????????????? :" + total_user);
        var Data = [];
        if (total_user === 1) {
          for (let index = 0; index < join_room.length; index++) {
            var bonus = {};
            if (index == 0) {
              bonus = {
                rank: "?????????????????? : " + (index + 1),
                total_bonus: "??????????????? : " + Math.ceil(poin * 1) + " ???????????????",
              };
            }
            Data.push(bonus);
          }
        }
        if (total_user === 2) {
          for (let index = 0; index < join_room.length; index++) {
            var bonus = {};
            if (index == 0) {
              bonus = {
                rank: "?????????????????? : " + (index + 1),
                total_bonus: "??????????????? : " + Math.ceil(poin * 2) + " ???????????????",
              };
            }
            if (index == 1) {
              bonus = {
                rank: "?????????????????? : " + (index + 1),
                total_bonus: "??????????????? : " + Math.ceil(poin * 1) + " ???????????????",
              };
            }
            Data.push(bonus);
          }
        }
        if (total_user === 3) {
          for (let index = 0; index < join_room.length; index++) {
            var bonus = {};
            if (index == 0) {
              bonus = {
                rank: "?????????????????? : " + (index + 1),
                total_bonus: "??????????????? : " + Math.ceil(poin * 3) + " ???????????????",
              };
            }
            if (index == 1) {
              bonus = {
                rank: "?????????????????? : " + (index + 1),
                total_bonus: "??????????????? : " + Math.ceil(poin * 2) + " ???????????????",
              };
            }
            if (index == 2) {
              bonus = {
                rank: "?????????????????? : " + (index + 1),
                total_bonus: "??????????????? : " + Math.ceil(poin * 1) + " ???????????????",
              };
            }
            Data.push(bonus);
          }
        }
        if (total_user === 4) {
          var bonus = {};
          if (index == 0) {
            bonus = {
              rank: "?????????????????? : " + (index + 1),
              total_bonus: "??????????????? : " + Math.ceil(poin * 4) + " ???????????????",
            };
          }
          if (index == 1) {
            bonus = {
              rank: "?????????????????? : " + (index + 1),
              total_bonus: "??????????????? : " + Math.ceil(poin * 3) + " ???????????????",
            };
          }
          if (index == 2) {
            bonus = {
              rank: "?????????????????? : " + (index + 1),
              total_bonus: "??????????????? : " + Math.ceil(poin * 2) + " ???????????????",
            };
          }
          if (index == 3) {
            bonus = {
              rank: "?????????????????? : " + (index + 1),
              total_bonus: "??????????????? : " + Math.ceil(poin * 1) + " ???????????????",
            };
          }
          Data.push(bonus);
        }
        if (total_user > 4) {
          var bonus = {};
          if (index == 0) {
            bonus = {
              rank: "?????????????????? : " + (index + 1),
              total_bonus: "??????????????? : " + Math.ceil(poin * 5) + " ???????????????",
            };
          }
          if (index == 1) {
            bonus = {
              rank: "?????????????????? : " + (index + 1),
              total_bonus: "??????????????? : " + Math.ceil(poin * 4) + " ???????????????",
            };
          }
          if (index == 2) {
            bonus = {
              rank: "?????????????????? : " + (index + 1),
              total_bonus: "??????????????? : " + Math.ceil(poin * 3) + " ???????????????",
            };
          }
          if (index == 3) {
            bonus = {
              rank: "?????????????????? : " + (index + 1),
              total_bonus: "??????????????? : " + Math.ceil(poin * 2) + " ???????????????",
            };
          }
          if (index == 4) {
            bonus = {
              rank: "?????????????????? : " + (index + 1),
              total_bonus: "??????????????? : " + Math.ceil(poin * 1) + " ???????????????",
            };
          }
          if (index > 4) {
            bonus = {
              rank: "?????????????????? : " + (index + 1),
              total_bonus: "??????????????? : " + Math.ceil(poin * 1) + " ???????????????",
            };
          }
          Data.push(bonus);
        }
        Bonus(Data);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const RoomDetail = async () => {
    var data = {
      user_id: us_id,
      room_id: join_room_id,
    };
    // ????????????????????????????????????
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/joinroom/ranking",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        var Data = [];
        for (let index = 0; index < response.data.data.length; index++) {
          const element = response.data.data[index];
          console.log(element);
          var status = "";
          Price_per_month(Math.ceil(price / installment));
          if (element.status === "saving") {
            status = "????????????????????????";
          }
          if (element.status === "cancelled") {
            status = "??????????????????";
          }
          if (
            element.status === "finished" ||
            element.status === "withdrawed"
          ) {
            status = "??????????????????";
          }
          const num = index + 1;
          var row = {
            num: "?????????????????? : " + num,
            user_id: element.users[0].fname + " " + element.users[0].lname,
            total_saving:
              "?????????????????????????????? " +
              new Intl.NumberFormat().format(element.total_savings),
            status: status,
          };
          Data.push(row);
        }
        Ranking(Data);
      },
      (error) => {
        console.log(error);
      }
    );

    // ??????????????????????????????
    // var p ??????????????????????????????????????????????????????????????????????????????
    var p = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/saving_rooms/roomdata_by_id",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        Price(Math.ceil(response.data.data[0].price)); //?????????????????????????????????????????????????????????
        Installment(response.data.data[0].installment); //????????????????????????
        Weight(response.data.data[0].weight); //??????????????????????????????
        Last_day(response.data.data[0].end_date); //???????????????????????????????????????
        return Math.ceil(response.data.data[0].price); //?????????????????????????????????????????????????????????
      },
      (error) => {
        console.log(error);
      }
    );
    // ??????????????????????????? ???????????????????????????
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/joinroom/getdata_by_user_id",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        Total_savings(response.data.data[0].total_savings);
        Total_installment(response.data.data[0].total_installment);

        if (response.data.data[0].status === "cancelled") {
          // console.log(response.data.data[0].status);
          Canceled(true);
        } else {
          Canceled(false);
        }
        if (p - response.data.data[0].total_savings < 0) {
          Balance("0");
        } else {
          Balance(p - response.data.data[0].total_savings);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const LoadDataHis = async () => {
    //?????????????????????????????????????????????????????????
    var data = {
      user_id: us_id,
      room_id: join_room_id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/bill/check_bill",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        // console.log(response.data.data.length);
        if (response.data.data.length === 0) {
          Is_empty(true);
        } else {
          Is_empty(false);
        }
        var Data = [];
        for (let index = 0; index < response.data.data.length; index++) {
          const element = response.data.data[index];
          var sta = "";
          if (element.status == "pending") {
            Is_pending(true);
            sta = "????????????????????????????????????";
          }
          if (element.status == "canceled") {
            sta = "??????????????????";
          }
          if (element.status == "approved") {
            sta = "??????????????????";
          }
          if (element.status == "declined") {
            sta = "?????????????????????";
          }
          var row = {
            title: "?????????????????????????????????",
            when: moment(element.upload_date).format("YYYY-MM-DD HH:mm:ss"),
            total_saving: new Intl.NumberFormat().format(element.money),
            status: sta,
          };
          Data.push(row);
        }
        His(Data);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const GoBack = async () => {
    return router.push("/mobile/list_room");
  };
  const Upload_Bill = async () => {
    var varDate = new Date(last_day); //dd-mm-YYYY
    var today = new Date();
    if (varDate < today) {
      //????????????????????????
      return Swal.fire({
        icon: "error",
        title: "?????????????????????",
        text: "????????????????????????????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????????????????????????????????",
      });
    }
    if (total_savings >= price) {
      //?????????????????????????????????
      Swal.fire({
        icon: "error",
        title: "?????????????????????",
        text: "??????????????????????????????????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????",
      });
    } else {
      //????????????????????????????????????????????????
      return router.push("/mobile/upload_bill");
    }
  };
  const Cancel_Bill = async () => {
    var data = {
      user_id: us_id,
      room_id: join_room_id,
    };
    var res = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/bill/bill_cancel",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "???????????????????????????",
            text: "?????????????????????????????????????????????",
          });
          LoadDataHis();
          RoomDetail();
          Is_pending(false);
        }

        if (response.status === 201) {
          Swal.fire({
            icon: "error",
            title: "??????????????????????????????????????????????????????",
            text: "???????????????????????????????????????????????????????????????????????????????????????",
          });
          LoadDataHis();
          RoomDetail();
          Is_pending(false);
        }

        return response.status;
      },
      (error) => {
        console.log(error);
      }
    );
    if (res === 200) {
      var messages_user = {
        messages: "????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
        user_id: us_id,
      };
      await axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer my-token",
          "My-Custom-Header": "foobar",
        },
        url: "/api/line_messaging_user",
        data: JSON.stringify({ data: messages_user }),
      });
    } else {
    }
  };
  return (
    <>
      <div
        style={{
          height: "100vh",
          backgroundColor: "rgb(156, 0, 0)",
          overflow: "scroll",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-3 d-flex justify-content-start">
              <div>
                <IconButton
                  style={{ backgroundColor: "#fff", padding: "0" }}
                  className="mr-auto mt-3"
                  onClick={GoBack}
                >
                  <ChevronLeftIcon
                    style={{ fontSize: 40, color: "rgb(156, 0, 0)" }}
                  />
                </IconButton>
              </div>
            </div>
            <div
              className="col-6 d-flex justify-content-center"
              style={{
                fontFamily: "SukhumvitSet-SemiBold",
                color: "rgb(0,190,22)",
                fontSize: "3vw",
              }}
            >
              <img
                src="/image/logo.svg"
                className="d-flex justify-content-center mt-5"
                width={"300px"}
                height={"150px"}
              />
            </div>
            <div className="col-3 d-flex justify-content-end pt-3">
              <Refresh
                style={{
                  fontSize: 30,
                  padding: "3px",
                  color: "#fff",
                  backgroundImage: "linear-gradient(rgb(101,0,0), rgb(53,0,0))",
                  borderRadius: "2px",
                }}
                onClick={() => RefreshData()}
              />
            </div>
          </div>
        </div>
        <div
          className="d-flex justify-content-center mt-3"
          style={{ width: "100vw" }}
        >
          <div class="row d-flex" style={{ width: "90vw" }}>
            <div class="col-6 d-flex justify-content-start">
              <button
                type="button"
                className="btn btn-sm"
                style={{
                  backgroundColor: "rgb(56, 0, 0)",
                  // width: "30vw",
                  fontFamily: "SukhumvitSet-SemiBold",
                  color: "#fff",
                }}
                onClick={() => Show_bonus(true)}
              >
                ????????????????????????????????????
              </button>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-sm "
                style={{
                  backgroundColor: "rgb(56, 0, 0)",
                  // width: "30vw",
                  fontFamily: "SukhumvitSet-SemiBold",
                  color: "#fff",
                }}
                onClick={() => Show_ranking(true)}
              >
                ???????????????????????????????????????
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <p
            className="card-text"
            style={{
              fontSize: "16pt",
              fontFamily: "SukhumvitSet-SemiBold",
              color: "#fff",
            }}
          >
            ?????????????????????????????? {weight}
          </p>
        </div>
        
        <div className="d-flex justify-content-center mt-2">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body justify-content-center ">
              <p
                className="card-text"
                style={{
                  fontSize: "16pt",
                  fontFamily: "SukhumvitSet-SemiBold",
                  color: "rgb(153, 0, 0)",
                  textAlign: "center",
                }}
              >
                ???????????????????????????
              </p>
              <p
                className="card-text"
                style={{
                  fontSize: "16pt",
                  fontFamily: "SukhumvitSet-SemiBold",
                  color: "rgb(153, 0, 0)",
                  textAlign: "center",
                }}
              >
                {new Intl.NumberFormat().format(Math.ceil(price / installment))}{" "}
                ?????????
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body justify-content-center ">
              <p
                className="card-text"
                style={{
                  fontSize: "16pt",
                  fontFamily: "SukhumvitSet-SemiBold",
                  color: "rgb(153, 0, 0)",
                  textAlign: "center",
                }}
              >
                ?????????????????????
              </p>
              <p
                className="card-text"
                style={{
                  fontSize: "16pt",
                  fontFamily: "SukhumvitSet-SemiBold",
                  color: "rgb(153, 0, 0)",
                  textAlign: "center",
                }}
              >
                {new Intl.NumberFormat().format(total_savings)}
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body justify-content-center ">
              <p
                className="card-text"
                style={{
                  fontSize: "16pt",
                  fontFamily: "SukhumvitSet-SemiBold",
                  color: "rgb(153, 0, 0)",
                  textAlign: "center",
                  marginBottom: "0px"
                }}
              >
                ?????????????????????????????????????????? {'\n'}
                
              </p>
              {/* <p className="card-text"
                style={{
                  fontSize: "16pt",
                  fontFamily: "SukhumvitSet-SemiBold",
                  color: "rgb(153, 0, 0)",
                  textAlign: "center",
                }}></p> */}
              <p
                className="card-text"
                style={{
                  fontSize: "16pt",
                  fontFamily: "SukhumvitSet-SemiBold",
                  color: "rgb(153, 0, 0)",
                  textAlign: "center",
                }}
              >
                {new Intl.NumberFormat().format((Math.ceil((price / installment))*installment)-total_savings)}{" "}?????????
                {/* {new Intl.NumberFormat().format(balance)} ????????? */}
                {/* {balance} ????????? */}
              </p>
            </div>
          </div>
        </div>
        
        {canceled ? (
          <></>
        ) : (
          <>
            <div
              hidden={canceled}
              className="d-flex justify-content-center mt-2"
            >
              <button
                type="button"
                className="btn  btn-sm"
                style={{
                  backgroundColor: "rgb(231, 180, 0)",
                  fontFamily: "SukhumvitSet-SemiBold",
                  color: "#fff",
                  width: "70vw",
                  fontSize:"1.2em",
                  marginLeft:"0px!important"
                }}
                hidden={is_pending}
                onClick={Upload_Bill}
              >
                ??????????????????????????????????????????????????????
              </button>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <button
                type="button"
                className="btn  btn-sm ml-2"
                hidden={!is_pending}
                style={{
                  backgroundColor: "rgb(70, 0, 0)",
                  width: "50vw",
                  fontFamily: "SukhumvitSet-SemiBold",
                  color: "#fff",
                }}
                onClick={Cancel_Bill}
              >
                ???????????????????????????
              </button>
            </div>
          </>
        )}

        <div className="d-flex justify-content-center mt-2">
          <p
            className="card-text"
            style={{
              fontSize: "16pt",
              fontFamily: "SukhumvitSet-SemiBold",
              color: "#fff",
            }}
          >
            ???????????????????????? {moment(last_day).format("L")}
          </p>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <p
            className="card-text"
            style={{
              fontSize: "16pt",
              fontFamily: "SukhumvitSet-SemiBold",
              color: "#fff",
            }}
            hidden={is_empty}
          >
            ?????????????????????
          </p>
        </div>
        <div className="d-flex justify-content-center mt-2  mb-5">
          <div
            hidden={is_empty}
            className="card"
            style={{
              width: "90vw",
              minHeight: "10vh",
              backgroundImage:
                "linear-gradient(rgb(255,255,255), rgb(195,195,195)",
              padding: "5px",
            }}
          >
            {his.map((item) => (
              <div className="station">
                {item.when} ?????????????????? {item.total_saving} - {item.status}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        size="xl"
        show={show_ranking}
        onHide={() => Show_ranking(false)}
        dialogClassName="modal-90w mt-30h"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Body>
          <form
            style={{
              maxHeight: "60vh",
              overflow: "scroll",
            }}
          >
            <div className="modal-body ">
              {ranking.map((item) => (
                <div className="station">
                  {item.num} {item.user_id} {item.total_saving} {item.status}
                </div>
              ))}
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        size="xl"
        show={show_bonus}
        onHide={() => Show_bonus(false)}
        dialogClassName="modal-90w mt-30h"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Body>
          <form
            style={{
              maxHeight: "60vh",
              overflow: "scroll",
            }}
          >
            <div className="modal-body ">
              ????????????????????????????????????????????????????????? {fristsaving} ??????
              {bonus.map((item) => (
                <div className="station">
                  {item.rank} {item.total_bonus}
                </div>
              ))}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
