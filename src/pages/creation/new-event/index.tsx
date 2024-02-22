import React, { useEffect, useState } from "react";
import { Layout } from "../../../layout";
import { UploadEventsImage } from "../../../utils";
import { useAppDispatch } from "../../../redux";
import { handleError, useLayoutSlice } from "../../../redux/app";
import { Button, Error, InputField } from "../../../component";
import { IEventsProps } from "../../../interface/event.inteface";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
     useDeleteEventByIdMutation,
     useLazyGetAllCategoriesQuery,
     useLazyGetEventByIdQuery,
     useRegisterNewEventMutation,
     useUpdateEventByIdMutation,
} from "../../../redux/api";
import { Listbox } from "@headlessui/react";
import { AiOutlineDown, AiOutlineLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IEventCategoryProps } from "../../../interface/category.interface";

export const NewEventsPage = () => {
     const [image, setImage] = useState<File[] | null>(null);
     const [uploaded, setUploaded] = useState<string | null>(null);
     const { eventId } = useParams();
     // !START EVENT CATEGORY BY ID API
     const [loading, setLoading] = useState<boolean>(false);
     const [eventInput, setEventInput] = useState<IEventsProps>({
          active: false,
          categoryId: "Select category",
          description: "",
          image: "",
          label: "",
          postedOn: new Date(),
          subTitle: "",
     });
     const { error } = useLayoutSlice();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     // API Configs
     const [
          GetEventById,
          {
               isError: isByIdError,
               error: byIdError,
               data: byIdData,
               isLoading: isByIdLoading,
               isSuccess: isByIdSuccess,
          },
     ] = useLazyGetEventByIdQuery();
     const [
          Categories,
          { isError: isCategoryError, error: categoryError, isLoading: isCategoryLoading, data: category },
     ] = useLazyGetAllCategoriesQuery();
     const [
          NewEvent,
          {
               isError: isNewEventError,
               error: newEventError,
               isLoading: isNewEventLoading,
               isSuccess: isNewEventSuccess,
               data: eventData,
          },
     ] = useRegisterNewEventMutation();
     const [
          UpdateEventById,
          {
               isError: isUpdateError,
               error: updateError,
               data: updateData,
               isSuccess: isUpdateSuccess,
               isLoading: isUpdateLoading,
          },
     ] = useUpdateEventByIdMutation();
     const [
          DeleteEventById,
          {
               isError: isDeleteError,
               error: deleteError,
               isLoading: isDeleteLoading,
               isSuccess: isDeleteSuccess,
               data: deleteData,
          },
     ] = useDeleteEventByIdMutation();

     useEffect(() => {
          if (isByIdError) {
               if ((byIdError as any).data) {
                    dispatch(handleError((byIdError as any)?.data.message));
               } else {
                    dispatch(handleError((byIdError as any).message));
               }
          }
          if (isCategoryError) {
               if ((categoryError as any).data) {
                    dispatch(handleError((categoryError as any)?.data.message));
               } else {
                    dispatch(handleError((categoryError as any).message));
               }
          }
          if (isNewEventError) {
               if ((newEventError as any).data) {
                    dispatch(handleError((newEventError as any)?.data.message));
               } else {
                    dispatch(handleError((newEventError as any).message));
               }
          }
          if (isUpdateError) {
               if ((updateError as any).data) {
                    dispatch(handleError((updateError as any)?.data.message));
               } else {
                    dispatch(handleError((updateError as any).message));
               }
          }
          if (isDeleteError) {
               if ((deleteError as any).data) {
                    console.log((deleteError as any).data.message);
                    dispatch(handleError((deleteError as any).data.message));
               } else {
                    console.log(deleteError);
                    dispatch(handleError((deleteError as any).error));
               }
          }
          if (isDeleteSuccess) {
               toast.success(deleteData?.data);
               navigate("/events", { replace: true });
          }
          if (isNewEventSuccess) {
               toast.success(eventData?.data);
               navigate("/events", { replace: true });
          }
          if (eventId) {
               (async () => {
                    await GetEventById(eventId);
               })();
          }
          if (isUpdateSuccess) {
               toast.success(updateData?.data);
               navigate("/events", { replace: true });
          }
          if (isByIdSuccess) {
               setLoading(true);
               setUploaded(byIdData?.data.image as string);
               setEventInput({
                    active: byIdData?.data.active as boolean,
                    categoryId: (byIdData?.data.categoryId as IEventCategoryProps).label,
                    description: byIdData?.data.description as string,
                    image: uploaded as string,
                    label: byIdData?.data.label as string,
                    postedOn: byIdData?.data.postedOn as Date,
                    subTitle: byIdData?.data.subTitle as string,
               });
               setLoading(false);
          }
          (async () => {
               await Categories();
          })();
     }, [
          isCategoryError,
          categoryError,
          dispatch,
          Categories,
          isNewEventError,
          newEventError,
          isNewEventSuccess,
          navigate,
          eventData?.data,
          eventId,
          GetEventById,
          isByIdSuccess,
          byIdData?.data,
          uploaded,
          isByIdError,
          byIdError,
          isUpdateError,
          updateError,
          isUpdateSuccess,
          updateData?.data,
          isDeleteError,
          deleteError,
          isDeleteSuccess,
          deleteData?.data,
     ]);

     const UploadEvent = async () => {
          if (eventId) {
               await UpdateEventById({
                    id: eventId,
                    payload: {
                         ...eventInput,
                    },
               });
          } else {
               if (!image || !eventInput) dispatch(handleError("Enter all fields to start upload"));
               else {
                    setLoading(true);
                    const firebaseImage = await UploadEventsImage(image[0] as File);
                    setUploaded(firebaseImage);
                    setLoading(false);

                    if (uploaded?.length) {
                         await NewEvent({ ...eventInput, image: uploaded });
                    }
                    setLoading(false);
               }
          }
     };

     const DeleteEvent = async () => {
          if (eventId) {
               await DeleteEventById(eventId);
          }
     };

     return (
          <Layout>
               <div>
                    <div className="w-[80%] mx-auto flex flex-col gap-3 justify-center items-start">
                         <div className="flex items-center gap-3">
                              <button type="button" onClick={() => navigate("/events", { replace: true })}>
                                   <AiOutlineLeft size={26} />
                              </button>
                              <h6 className="text-2xl capitalize">
                                   {eventId && "Update"}
                                   {eventId ? (
                                        <span className="text-primary-500"> {byIdData?.data.label}</span>
                                   ) : (
                                        "Create new events"
                                   )}
                              </h6>
                         </div>
                         <p className="text-gray-500">
                              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque error ipsum iusto odit
                              eos, non dignissimos? Libero impedit voluptatibus placeat.
                         </p>
                         <div className="w-full">{error && <Error text={error as string} />}</div>
                         <div className="w-full flex flex-col gap-3">
                              <InputField
                                   disabled={isByIdLoading}
                                   label="Event title"
                                   value={eventInput.label}
                                   onChange={(e) =>
                                        setEventInput({
                                             ...eventInput,
                                             label: e.target.value,
                                        })
                                   }
                              />
                              <div className="flex gap-5 items-end w-full">
                                   <div className="flex-1">
                                        <InputField
                                             label="Event Slogan"
                                             value={eventInput.subTitle}
                                             onChange={(e) =>
                                                  setEventInput({
                                                       ...eventInput,
                                                       subTitle: e.target.value,
                                                  })
                                             }
                                        />
                                   </div>
                                   <div className="flex flex-col relative flex-1">
                                        <label htmlFor="category" className="text-gray-400 font-semibold select-none">
                                             Select event category
                                        </label>
                                        <Listbox
                                             value={eventInput.categoryId}
                                             onChange={(e) =>
                                                  setEventInput({
                                                       ...eventInput,
                                                       categoryId: e,
                                                  })
                                             }
                                        >
                                             <Listbox.Button
                                                  id="category"
                                                  className="border-2 flex gap-3 items-center w-full justify-center p-3 rounded-lg"
                                             >
                                                  {eventInput.categoryId
                                                       ? (eventInput.categoryId as string)
                                                       : "Which events belongs to which category"}
                                                  <AiOutlineDown />
                                             </Listbox.Button>
                                             <Listbox.Options className="flex flex-col gap-5 absolute top-16 bg-white z-50 w-full shadow-xl p-3 rounded-lg border-2">
                                                  {category?.data.map(({ label, _id }) => (
                                                       <Listbox.Option className="cursor-pointer" key={_id} value={_id}>
                                                            <p className="capitalize">{label}</p>
                                                       </Listbox.Option>
                                                  ))}
                                             </Listbox.Options>
                                        </Listbox>
                                   </div>
                              </div>
                              <QuillEditor
                                   className="z-10 h-[400px]"
                                   value={eventInput.description}
                                   onChange={(e) =>
                                        setEventInput({
                                             ...eventInput,
                                             description: e,
                                        })
                                   }
                              />

                              <div className="flex items-start justify-center w-full gap-5 mt-14 flex-col">
                                   <div className="flex flex-col">
                                        <label htmlFor="category" className="text-gray-400 font-semibold select-none">
                                             Upload image for event
                                        </label>
                                        <input
                                             className="file:bg-primary-500 file:border-0 file:p-3 file:rounded-md file:text-white flex-1 hover:bg-primary-300 rounded-lg hover:text-white"
                                             id="picture"
                                             name="picture"
                                             type="file"
                                             onChange={(e) => setImage(e.target.files as unknown as File[])}
                                        />
                                   </div>
                                   {uploaded?.length && (
                                        <img src={uploaded} className="rounded-lg" alt={eventInput.label} />
                                   )}
                              </div>
                         </div>
                         <div className="flex justify-end w-full gap-3">
                              {eventId && (
                                   <Button
                                        dangerOutlined
                                        loading={
                                             loading ||
                                             isCategoryLoading ||
                                             isNewEventLoading ||
                                             isByIdLoading ||
                                             isUpdateLoading
                                        }
                                        fullWidth={false}
                                        small
                                        onClick={DeleteEvent}
                                   >
                                        delete this event
                                   </Button>
                              )}
                              <Button
                                   outlined
                                   loading={
                                        loading ||
                                        isCategoryLoading ||
                                        isNewEventLoading ||
                                        isByIdLoading ||
                                        isUpdateLoading ||
                                        isDeleteLoading
                                   }
                                   fullWidth={false}
                                   small
                                   onClick={UploadEvent}
                              >
                                   {uploaded ? "Upload event" : "Upload images"}
                              </Button>
                         </div>
                    </div>
               </div>
          </Layout>
     );
};
