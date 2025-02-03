'use client'

import react, { useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import Head from "next/head";
import Image from "next/image";
import {
  PolylineF,
  MarkerF,
  FORWARD_CLOSED_ARROW,
} from "@react-google-maps/api";
import pic from "/public/106.png";
import ac_marker from "/public/airplane-svgrepo-com.png";

