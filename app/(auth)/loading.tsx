import { Spinner } from "@/components/ui/spinner";

const loading = () => {
  return (
    <div className="h-full grid place-content-center">
      <Spinner />
    </div>
  )
}

export default loading