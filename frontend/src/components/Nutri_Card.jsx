"use client";;
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";

export default function BackgroundGradientDemo({props}) {
  return (
    <div>
      <BackgroundGradient className="rounded-[22px] max-w-md max-sm:max-w-[280px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <div className="m-1 flex text-neutral-200">
          <h3 className="font-bold max-sm:text-sm">Your BMI : </h3>
          <p className="max-sm:text-sm"> &nbsp; {props.BMI_EER?.BMI} </p>
        </div>
        <div className="m-1 flex text-neutral-200">
          <h3 className="font-bold max-sm:text-sm">Your Daily Caloric Needs : </h3>
          <p className="max-sm:text-sm"> &nbsp; {props.BMI_EER?.["Estimated Daily Caloric Needs"]} </p>
        </div>
        <h1 className="text-neutral-200 font-bold m-1 text-lg max-sm:text-lg">Daily Macronutrient Needs :</h1>
        <div className="m-1 flex text-neutral-200">
          <h3 className="font-bold max-sm:text-sm">Proteins : </h3>
          <p className="max-sm:text-sm"> &nbsp; {props.macronutrients_table?.["macronutrients-table"].find(item => item[0] === "Protein")?.[1]} </p>
        </div>
        <div className="m-1 flex text-neutral-200">
          <h3 className="font-bold max-sm:text-sm">Fats : </h3>
          <p className="max-sm:text-sm"> &nbsp; {props.macronutrients_table?.["macronutrients-table"].find(item => item[0] === "Fat")?.[1]} </p>
        </div>
        <div className="m-1 flex text-neutral-200">
          <h3 className="font-bold max-sm:text-sm">Carbohydrates : </h3>
          <p className="max-sm:text-sm"> &nbsp; {props.macronutrients_table?.["macronutrients-table"].find(item => item[0] === "Carbohydrate")?.[1]} </p>
        </div>
      </BackgroundGradient>
    </div>
  );
}
