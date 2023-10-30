import Loader from "../components/loader/loader";
import { useProductContext } from "../productContext";
import styles from "../style/home.module.css"

export const Home = () => {
  const { isLoading }=useProductContext()
  return (
    <>
    {/* checking whether to show/hide loading spinner */}
    {isLoading ? (
      <Loader />
    ) : (
      <>
        {/* page header */}
        <div className={styles.header}>
          {/* search bar */}
          {/* <input
            type="text"
            placeholder="Search By Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
        </div>

        {/* rendering all the products and filter bar */}
        <div className={styles.mainContainer}>
          {/* apply filter button  */}
          {/* show/hide on button click */}
          {/* <span className={styles.header}><button onClick={() => setApplyFilter(!applyFilter)}> */}
            {applyFilter ? "Cancel" : "Apply Filter"}
          {/* </button> </span> */}
          {/* is applyFilter "true" then render it  */}
          {/* {applyFilter && (
            <FilterBar
              price={price}
              setPrice={setPrice}
              setCategory={setCategory}
            />
          )} */}

          {/* show all the products */}
          {/* props to apply filter on the products */}
          <MainContent
            search={search}
            price={price}
            category={category}
            applyFilter={applyFilter}
          />
        </div>
      </>
    )}
  </>
  );
};
