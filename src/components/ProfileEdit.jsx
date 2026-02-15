import { zodResolver } from "@hookform/resolvers/zod";
import React, { use } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";
import api from "../utils/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/auth/authSlice";

const profileEditSchema = z.object({
  photoUrl: z.string().url("Enter a valid URL").optional(),
  firstName: z
    .string()
    .min(1, "First Name is Required.")
    .max(50, "First Name must be at most 50 characters"),
  lastName: z
    .string()
    .min(1, "Last Name is Required.")
    .max(50, "Last Name must be at most 50 characters"),
  age: z

    .number()
    .min(0, "Age cannot be negative")
    .min(18, "You must be at least 18 years old")
    .max(120, "Age must be less than or equal to 120")
    .optional(),
  gender: z
    .enum(["male", "female", "other"], {
      message: "Please select a valid gender",
    })
    .optional(),
  skills: z
    .string()
    .transform((str) =>
      str
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0),
    )
    .refine((arr) => arr.length <= 10, "You can enter at most 10 skills")
    .optional(),
  about: z.string().max(500, "About must be at most 500 characters").optional(),
});

const ProfileEdit = ({ user, setEditMode, editMode }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      photoUrl: user?.photoUrl || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      age: user?.age || undefined,
      gender: user?.gender || "",
      skills: user?.skills?.join(", ") || "",
      about: user?.about || "",
    },
  });

  const handleProfileEdit = async (data) => {
    const res = await api.patch("/profile", data);
    console.log(res?.data?.data);
    dispatch(setUser(res?.data?.data));
    setEditMode(false);
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleProfileEdit)}
        className="w-full max-w-lg"
      >
        <fieldset className="bg-base-200 border-base-300 rounded-box w-full max-w-md border p-4 space-y-4">
          <h2 className="text-xl font-semibold text-center">Edit Profile</h2>

          {/* Photo */}
          <div className="flex flex-col items-center">
            <img
              src={user?.photoUrl}
              alt="profile"
              className="w-20 h-20 rounded-full mb-2"
            />

            <div className="w-full">
              <label className="label mb-1">Photo Url</label>
              <input
                name="photoUrl"
                {...register("photoUrl")}
                placeholder="Photo URL"
                className="input w-full"
              />
              <span className="text-red-500 inline-block text-sm">
                {errors.photoUrl?.message}
              </span>
            </div>
          </div>

          {/* First + Last Name */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="label">First Name</label>
              <input
                type="text"
                name="firstName"
                {...register("firstName")}
                className="input w-full"
                placeholder="First Name"
              />
              <span className="text-red-500 inline-block text-sm">
                {errors.firstName?.message}
              </span>
            </div>

            <div className="w-1/2">
              <label className="label">Last Name</label>
              <input
                type="text"
                name="lastName"
                {...register("lastName")}
                className="input w-full"
                placeholder="Last Name"
              />
              <span className="text-red-500 inline-block text-sm">
                {errors.lastName?.message}
              </span>
            </div>
          </div>

          {/* Age + Gender */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="label">Age</label>
              <input
                type="number"
                name="age"
                {...register("age", {
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
                className="input w-full"
                placeholder="Age"
              />
              <span className="text-red-500 inline-block text-sm">
                {errors.age?.message}
              </span>
            </div>

            <div className="w-1/2">
              <label className="label">Gender</label>

              <select
                name="gender"
                className="input w-full"
                {...register("gender")}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <span className="text-red-500 inline-block text-sm">
                {errors.gender?.message}
              </span>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="label">Skills</label>
            <input
              type="text"
              name="skills"
              {...register("skills")}
              className="input w-full"
              placeholder="Skills (comma separated)"
            />
            <span className="text-red-500 inline-block text-sm">
              {errors.skills?.message}
            </span>
          </div>

          {/* About (Full Width) */}
          <div className="w-full min-w-0">
            <label className="label">About</label>

            <textarea
              className="textarea textarea-bordered w-full h-24 resize-none overflow-x-hidden break-all whitespace-pre-wrap"
              {...register("about")}
              placeholder="About"
            />
            <span className="text-red-500 inline-block text-sm">
              {errors.about?.message}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="btn btn-soft btn-primary mt-4 w-full disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="btn btn-ghost w-full"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default ProfileEdit;
