import {Modal as DefModal} from "react-native";

export type ModalProps = DefModal["props"] & {
  title?: string;
  description?: string;
  dismissible?: boolean;
};

export type BadgeModalProps = {
  type: string;
} & ModalProps;

export type BadgeProps = {
  svg?: any;
  title?: string;
  subTitle?: string;
};
