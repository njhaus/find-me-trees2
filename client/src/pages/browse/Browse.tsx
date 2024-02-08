import { FormEvent, createContext, useState, useEffect } from "react";

import { Flex } from "@chakra-ui/react";

import SearchFilters from "./SearchFilters";
import TreeList from "./TreeList";
import BrowseTitle from "./BrowseTitle";
import { iFormData } from "./browse_data/filterFormData";
import initialFormData from "./browse_data/filterFormData";

import "./styles/browse.css";
import { apiPost } from "../../services/api_client";
import { ApiErrorType, isApiErrorType } from "../../data/types";
import { iTreeData, isTreeData } from "../tree/data/tree_data";
import useServerError from "../../hooks/useServerError";

// Set form context (Form found in SearchFilters and inputs are in many children within SearchFilters)
export interface iFormDataContext {
  formData: iFormData;
  setFormData: React.Dispatch<React.SetStateAction<iFormData>>;
}

export const FormDataContext = createContext<iFormDataContext>({
  formData: initialFormData,
  setFormData: () => FormData,
});

const Browse = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [filteredTrees, setFilteredTrees] = useState<iTreeData[]>([]);
  // Need to store search terms to be sent to treelist, but not reset when form is reset
  const [searchTerms, setSearchTerms] = useState(initialFormData);
  const { setServerError } = useServerError();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Need to refactor into apiPost
  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response: Awaited<iTreeData[] | ApiErrorType> = await apiPost (
          "browse",
          (formData),
          abortController
        );
        console.log(response)
        if (!isMounted) return;
        if (Array.isArray(response)) {
          if (response.length > 0 && isTreeData(response[0])) {
              setFilteredTrees(response as iTreeData[]);
          }
          else {
            setFilteredTrees([]);
          }
          setSearchTerms(formData);
        } 
         else {
           if (isApiErrorType(response)) {
             console.log((response as ApiErrorType).error);
             throw new Error((response as ApiErrorType).error);
           } else {
             throw new Error("Unknown Error: Tree data not found");
           }
        }
      } catch (err) {
        console.log(err);
        setServerError(
          typeof err === "string"
            ? err
            : ((err as Error).message
              ? (err as Error).message
              : "An unknown error occurred")
        );
      } finally {
        if (isMounted) {
          setSubmitting(false);
        }
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [submitting]);

  // Need to reset search terms so the form resets, but not everything else
  useEffect(() => {
    setFormData(initialFormData);
  }, [filteredTrees]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
  };

  return (
    <Flex direction={"column"} minHeight={"calc(100vh - 10rem)"}>
      <BrowseTitle />
      <FormDataContext.Provider value={{ formData, setFormData }}>
        <SearchFilters onSubmit={handleSubmit} />
        <TreeList filteredTrees={filteredTrees} searchTerms={searchTerms} />
      </FormDataContext.Provider>
    </Flex>
  );
};

export default Browse;
