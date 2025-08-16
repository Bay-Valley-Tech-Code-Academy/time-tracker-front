import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const ConfirmResetPassword = () => {
    return (
        <div>
            <form>
                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" id="psw" required></input>

                <label htmlFor="psw-confirm"><b>Confirm Password</b></label>
                <input type="password" placeholder="Confirm Password" name="psw-confirm" id="psw-confirm" required></input>
            </form>
            <button> Reset </button>

        </div>
    );
};

export default ConfirmResetPassword;
