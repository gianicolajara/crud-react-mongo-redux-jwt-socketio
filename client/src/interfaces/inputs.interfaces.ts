import { ChangeEvent, ChangeEventHandler } from "react";

export type ChangeEventInput = ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement
>;

export type EventInput = ChangeEvent<HTMLInputElement>;
