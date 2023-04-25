import { type NextPage } from "next";
import { PageLayout } from "~/components/layout";
import { zodResolver } from "@hookform/resolvers/zod";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import tw from "twin.macro";
import { useEffect } from "react";
import { type BarcodedBoardingPass, encode } from "bcbp";

const BCBPschema = z.object({
  PassengerName: z.string(),
  ElectronicTicketNumber: z.string(),
  FlightNumber: z.string(),
  DepartureCityCode: z.string(),
  ArrivalCityCode: z.string(),
  FlightDate: z.string(),
  CompartmentCode: z.string(),
  SeatNumber: z.string(),
  CheckInSequenceNumber: z.string(),
  BoardingPassIssuanceDate: z.string(),
  SecurityData: z.string(),
  DocumentType: z.string(),
  PassengerStatus: z.string(),
  AirlineDesignatorCode: z.string(),
  BaggageTagNumber: z.string().optional(),
});
type FormData = z.infer<typeof BCBPschema>;

const Register: NextPage = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(BCBPschema),
  });

  const onSubmit = (data: FormData) => {
    try {
      const encodedData = encode(data as BarcodedBoardingPass);
      console.log({ encodedData });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    setValue("BoardingPassIssuanceDate", new Date().toISOString().slice(0, 16));
  }, []);

  return (
    <PageLayout>
      <div className="p-4 text-xl font-bold">Register Passenger</div>
      <div></div>
      <form
        className="flex flex-col gap-3 p-4"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-start">
          <button type="submit" className="rounded-xl bg-red-300 px-4 py-2">
            Submit
          </button>
        </div>
        <Label>Passenger Name:</Label>
        <Input type="text" {...register("PassengerName", { required: true })} />
        {errors.PassengerName && <span>This field is required</span>}

        <Label>Electronic Ticket Number or Reservation Number:</Label>
        <Input
          type="text"
          {...register("ElectronicTicketNumber", { required: true })}
        />
        {errors.ElectronicTicketNumber && <span>This field is required</span>}

        <Label>Flight Number:</Label>
        <Input type="text" {...register("FlightNumber", { required: true })} />
        {errors.FlightNumber && <span>This field is required</span>}

        <Label>Departure City Code:</Label>
        <Input
          type="text"
          {...register("DepartureCityCode", { required: true })}
        />
        {errors.DepartureCityCode && <span>This field is required</span>}

        <Label>Arrival City Code:</Label>
        <Input
          type="text"
          {...register("ArrivalCityCode", { required: true })}
        />
        {errors.ArrivalCityCode && <span>This field is required</span>}

        <Label>Flight Date:</Label>
        <Input type="date" {...register("FlightDate", { required: true })} />
        {errors.FlightDate && <span>This field is required</span>}

        <Label>Compartment Code:</Label>
        <Input
          type="text"
          {...register("CompartmentCode", { required: true })}
        />
        {errors.CompartmentCode && <span>This field is required</span>}

        <Label>Seat Number:</Label>
        <Input type="text" {...register("SeatNumber", { required: true })} />
        {errors.SeatNumber && <span>This field is required</span>}

        <Label>Check-In Sequence Number:</Label>
        <Input
          type="text"
          {...register("CheckInSequenceNumber", { required: true })}
        />
        {errors.CheckInSequenceNumber && <span>This field is required</span>}

        <Label>Boarding Pass Issuance Date:</Label>
        <Input
          type="datetime-local"
          {...register("BoardingPassIssuanceDate", { required: true })}
        />
        {errors.BoardingPassIssuanceDate && <span>This field is required</span>}

        <Label>Security Data:</Label>
        <Input type="text" {...register("SecurityData", { required: true })} />
        {errors.SecurityData && <span>This field is required</span>}

        <Label>Document Type:</Label>
        <Input type="text" {...register("DocumentType", { required: true })} />
        {errors.DocumentType && <span>This field is required</span>}

        <Label>Passenger Status:</Label>
        <Input
          type="text"
          {...register("PassengerStatus", { required: true })}
        />
        {errors.PassengerStatus && <span>This field is required</span>}

        <Label>Airline Designator Code:</Label>
        <Input
          type="text"
          {...register("AirlineDesignatorCode", {
            required: true,
            pattern: /^[A-Z]{2}$/,
          })}
        />
        {errors.AirlineDesignatorCode &&
          errors.AirlineDesignatorCode.type === "required" && (
            <span>This field is required</span>
          )}
        {errors.AirlineDesignatorCode &&
          errors.AirlineDesignatorCode.type === "pattern" && (
            <span>Must be 2 uppercase letters</span>
          )}

        <Label>Baggage Tag Number:</Label>
        <Input
          type="text"
          {...register("BaggageTagNumber", {
            required: true,
            pattern: /^[0-9]{10}$/,
          })}
        />
        {errors.BaggageTagNumber &&
          errors.BaggageTagNumber.type === "required" && (
            <span>This field is required</span>
          )}
        {errors.BaggageTagNumber &&
          errors.BaggageTagNumber.type === "pattern" && (
            <span>Must be 10 digits</span>
          )}
      </form>
    </PageLayout>
  );
};

export default Register;

const Label = styled.label(
  css`
    ${tw`text-lg`}
    font-weight: bold;
    border-top: 1px solid;
  `
);

const Input = styled.input(
  css`
    ${tw`text-slate-800 py-1 px-2 rounded-xl border text-lg`}
  `
);
