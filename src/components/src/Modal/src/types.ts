import {ReactNode} from "react";

import {Modal as DefModal} from "react-native";

export type ModalProps = DefModal["props"] & {
  title?: string;
  description?: string;
  dismissible?: boolean;
};

export type DialogProps = ModalProps & {
  IconComponent?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (() => void) | (() => Promise<void>);
};

export type BadgeModalProps = {
  type: string;
} & ModalProps;

export type BadgeProps = {
  svg?: any;
  title?: string;
  subTitle?: string;
};
