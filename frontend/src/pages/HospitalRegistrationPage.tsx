// "use client"

import { useState, useRef, ChangeEvent, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import {
  Button,
  Input,
  Textarea,
  Select,
  Option,
  Card,
  Typography,
  CircularProgress,
  FormControl,
  Stack,
} from "@mui/joy";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

type HospitalDetailsType = {
  hospital_applicant_name: string;
  hospital_name: string;
  identity_type: string;
  identity_card: FileList | null;
  hospital_contact_number: string;
  hospital_email: string;
  hospital_pincode: string;
  hospital_address: string;
  hospital_photoes: FileList | null;
};

type ImageLinksType = {
  identity_card: string;
  hospital_photoes: string[];
};

export function HospitalRegistrationForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [hospitalDetails, setHospitalDetails] = useState<HospitalDetailsType>({
    hospital_applicant_name: "",
    hospital_name: "",
    identity_type: "",
    identity_card: null,
    hospital_contact_number: "",
    hospital_email: "",
    hospital_pincode: "",
    hospital_address: "",
    hospital_photoes: null,
  });

  const [imageLinks, setImageLinks] = useState<ImageLinksType>({
    identity_card: "",
    hospital_photoes: [],
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const hospitalPhotosRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files) return;

    if (name === "hospital_photoes" && files.length > 3) {
      toast.error("More than 3 images are not allowed");
      return;
    }

    setHospitalDetails((prev) => ({
      ...prev,
      [name]: files,
    }));

    if (name === "identity_card") {
      const src = URL.createObjectURL(files[0]);
      setImageLinks((prev) => ({ ...prev, identity_card: src }));
      toast.success("Identity card uploaded successfully");
    } else {
      const arr = Array.from(files).map((file) => URL.createObjectURL(file));
      setImageLinks((prev) => ({ ...prev, hospital_photoes: arr }));
      toast.success(`${files.length} hospital photos uploaded successfully`);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHospitalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setHospitalDetails({
      hospital_applicant_name: "",
      hospital_name: "",
      identity_type: "",
      identity_card: null,
      hospital_contact_number: "",
      hospital_email: "",
      hospital_pincode: "",
      hospital_address: "",
      hospital_photoes: null,
    });
    setImageLinks({ identity_card: "", hospital_photoes: [] });
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (hospitalPhotosRef.current) hospitalPhotosRef.current.value = "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Submitting your application...");

    const formData = new FormData();
    for (const key in hospitalDetails) {
      const value = hospitalDetails[key as keyof HospitalDetailsType];

      if (key === "identity_card" && value instanceof FileList) {
        formData.append(key, value[0]);
      } else if (key === "hospital_photoes" && value instanceof FileList) {
        for (let i = 0; i < value.length; i++) {
          formData.append("hospital_photoes", value[i]);
        }
      } else if (typeof value === "string") {
        formData.append(key, value);
      }
    }

    try {
      await axiosInstance.post("/hospital/applyForHospital", formData);
      toast.dismiss(loadingToast);
      toast.success(
        "Successfully applied for hospital registration! Your account will be created after verification."
      );
      reset();
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error(
        error.response?.data?.msg || "An error occurred during submission"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto scroll-smooth bg-gray-900 text-white">
      <div className="mx-auto p-6">
        <Toaster position="top-right" />
        <Card
          variant="outlined"
          sx={{
            padding: 4,
            backgroundColor: "#1e293b",
            color: "white",
            borderColor: "#334155",
          }}
        >
          <Typography level="h3" sx={{ textAlign: "center", mb: 4 , color:"#42A5F5"}}>
            Apply For Hospital
          </Typography>
          {loading ? (
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ height: "16rem" }}
            >
              <CircularProgress size="lg" color="success" />
            </Stack>
          ) : (
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <FormControl sx={{ flex: 1 }}>
                    <Input
                      color="neutral"
                      variant="soft"
                      placeholder="Applicant's Name"
                      name="hospital_applicant_name"
                      value={hospitalDetails.hospital_applicant_name}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                  <FormControl sx={{ flex: 1 }}>
                    <Input
                      color="neutral"
                      variant="soft"
                      placeholder="Hospital Name"
                      name="hospital_name"
                      value={hospitalDetails.hospital_name}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </Stack>

                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  alignItems="center"
                >
                  <FormControl sx={{ flex: 1 }}>
                    <Select
                      color="neutral"
                      placeholder="Identity Type"
                      value={hospitalDetails.identity_type}
                      onChange={(e, val) =>
                        setHospitalDetails((prev) => ({
                          ...prev,
                          identity_type: val || "",
                        }))
                      }
                    >
                      <Option value="voter card">Voter Card</Option>
                      <Option value="aadhar card">Aadhaar Card</Option>
                      <Option value="driving license">Driving License</Option>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ flex: 1 }}>
                    <input
                      type="file"
                      name="identity_card"
                      accept=".jpg,.jpeg,.png,.pdf"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      id="identity_card_upload"
                    />
                    <label htmlFor="identity_card_upload">
                      <Button component="span" variant="soft" fullWidth>
                        Upload Identity Card
                      </Button>
                    </label>
                  </FormControl>
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <FormControl sx={{ flex: 1 }}>
                    <Input
                      color="neutral"
                      variant="soft"
                      type="tel"
                      placeholder="Contact Number"
                      name="hospital_contact_number"
                      value={hospitalDetails.hospital_contact_number}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                  <FormControl sx={{ flex: 1 }}>
                    <Input
                      color="neutral"
                      variant="soft"
                      type="email"
                      placeholder="Email"
                      name="hospital_email"
                      value={hospitalDetails.hospital_email}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                  <FormControl sx={{ flex: 1 }}>
                    <Input
                      color="neutral"
                      variant="soft"
                      type="text"
                      placeholder="Pincode"
                      name="hospital_pincode"
                      value={hospitalDetails.hospital_pincode}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <FormControl sx={{ flex: 1 }}>
                    <Textarea
                      color="neutral"
                      variant="soft"
                      placeholder="Full Address"
                      minRows={10}
                      sx={{ height: "100%" }}
                      name="hospital_address"
                      value={hospitalDetails.hospital_address}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                  <FormControl sx={{ flex: 1 }}>
                    <Card
                      variant="outlined"
                      sx={{
                        p: 2,
                        height: "100%",
                        minHeight: "10rem",
                        border: "1px dashed",
                        borderColor: "#64748b",
                        backgroundColor: "#0f172a",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {imageLinks.hospital_photoes.length > 0 ? (
                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          justifyContent="center"
                        >
                          {imageLinks.hospital_photoes.map((src, idx) => (
                            <img
                              key={idx}
                              src={src}
                              alt={`hospital-${idx}`}
                              style={{
                                width: "5rem",
                                height: "4rem",
                                objectFit: "cover",
                                borderRadius: "4px",
                              }}
                            />
                          ))}
                        </Stack>
                      ) : (
                        <Camera size={40} color="#9e9e9e" />
                      )}
                      <input
                        placeholder="Upload Hospital Photos"
                        type="file"
                        name="hospital_photoes"
                        ref={hospitalPhotosRef}
                        onChange={handleFileChange}
                        multiple
                        accept=".jpg,.jpeg,.png"
                        style={{
                          marginTop: "0.5rem",
                          padding: "0.5rem",
                          border: "1px solid #64748b",
                          borderRadius: "8px",
                          backgroundColor: "#1e293b",
                          color: "white",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                        }}
                      />
                      <Typography
                        level="body-sm"
                        sx={{ color: "#94a3b8", fontSize: "0.75rem" }}
                      >
                        Upload up to 3 photos (jpg/png)
                      </Typography>
                    </Card>
                  </FormControl>
                </Stack>

                <Button type="submit" color="success" fullWidth >
                  Submit Application
                </Button>
                <Typography
                  level="body-sm"
                  textAlign="center"
                  sx={{
                    color: "#cbd5e1",
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    "@keyframes pulse": {
                      "0%, 100%": {
                        opacity: 1,
                      },
                      "50%": {
                        opacity: 0.5,
                      },
                    },
                  }}
                >
                  You will receive credentials after verification
                </Typography>
              </Stack>
            </form>
          )}

          <button
            className="absolute bottom-4 left-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 hover:cursor-pointer"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </Card>
      </div>
    </div>
  );
}
